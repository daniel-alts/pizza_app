const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/order.model');

orderRouter.post('/', async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price
    return prev
  }, 0);

  const order = await Order.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price
  })

  return res.json({ status: true, order })
})

orderRouter.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)

  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  return res.json({ status: true, order })
})

orderRouter.get('/orders', async (req, res) => {
  const orders = await Order.find()

  return res.json({ status: true, orders })
})

orderRouter.patch('/order/:id', async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await Order.findById(id)

  if (!order) {
    return res.status(404).json({ status: false, order: null })
  }

  if (state < order.state) {
    return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
  }

  order.state = state;

  await order.save()

  return res.json({ status: true, order })
})

orderRouter.delete('/order/:id', async (req, res) => {
  const { id } = req.params;

  const order = await Order.deleteOne({ _id: id })

  return res.json({ status: true, order })
})

module.exports = orderRouter;