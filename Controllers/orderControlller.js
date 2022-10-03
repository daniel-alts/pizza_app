const orderModel = require('../Models/orderModel');
const moment = require('moment')

const makeOrder = async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
      prev += curr.price
      return prev
  }, 0);

  const order = await orderModel.create({ 
      items: body.items,
      created_at: moment().toDate(),
      total_price
  })
  
  return res.json({ status: true, order })
} 

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId)

  if (!order) {
      return res.status(404).json({ status: false, order: null })
  }

  return res.json({ status: true, order })
}

const getOrders = async (req, res) => {
  const state = req.query.state
  let order = req.query.order
  let orderNo
   if (order === "asc") {
    orderNo = 1
   }
   else{
    orderNo = -1
   }

  const orders = await orderModel.find(state).limit(1).sort({created_at: orderNo, total_price: orderNo})

  return res.json({ status: true, orders })
}

const updateOrders = async (req, res) => {
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
}

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id})

  return res.json({ status: true, order })
}

module.exports = {
  getOrderById,
  getOrders,
  updateOrders,
  deleteOrder,
  makeOrder
}
