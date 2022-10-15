const express = require('express');
const orderRouter = express.Router();
const moment = require('moment');
const orderModel = require('../models/order_model');

//get order information

orderRouter.post('/', async (req, res) => {
 const body = req.body;
 try {
  console.log(body) 
  const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price * curr.quantity
        return prev
   
      }, 0);
     console.log(total_price)
    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, data: order })
  } catch (err) {
    return res.status(500).json({message: "Error occured"})
  }
})


orderRouter.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId)

  if (!order) {
      return res.status(404).json({ status: false, order: null })
  }

  return res.json({ status: true, order })
})



orderRouter.get('/orders', async (req, res) => {
  const { page = 1, limit = 5} = req.guery;
  const orders = await orderModel.find()
.limit (limit * 1)
skip ((page - 1) * limit);
  return res.json({ status: true, orders })
})


orderRouter.patch('/order/:id', async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findById(id)

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

  const order = await orderModel.deleteOne({ _id: id})

  return res.json({ status: true, order })
})

 module.exports = orderRouter
