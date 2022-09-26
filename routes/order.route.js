const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/order.model');
const { validatePostOrder } = require('../middlewares/validator');

orderRouter.post('/', validatePostOrder, async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price
    return prev
  }, 0);

  const order = await Order.create({
    items: body.items,
    total_price,
    user: req.user.id
  })

  return res.json({ status: true, order })
})

orderRouter.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('user');

  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  return res.json({ status: true, order })
})

orderRouter.get('/', async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('user');

  return res.json({ status: true, orders })
})

orderRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await Order.findById(id)

  if (!order) {
    return res.status(404).json({ status: false, error: 'Order does not exist' })
  }

  if (req.user.id !== order.user.toString()) {
    return res.status(403).json({ status: false, error: 'unauthorized' })
  }

  if (state < order.state) {
    return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
  }

  order.state = state;

  await order.save()
  const _order = order.populate('user')

  return res.json({ status: true, order: _order })
})

orderRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)

  if (!order) {
    return res.status(404).json({ status: false, error: 'Order does not exist' })
  }

  if (req.user.id !== order.user.toString()) {
    return res.status(403).json({ status: false, error: 'unauthorized' })
  }

  const _order = await Order.deleteOne({ _id: id })

  return res.json({ status: true, order: _order })
})

module.exports = orderRouter;