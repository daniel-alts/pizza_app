const Order = require('../model/order')
const moment = require('moment');


const getOrders = async (req, res, next) => {
 const orders = await Order.find()
 return res.status(200).json(orders)
 
}


const getOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) return res.status(404).json({ msg: "order not found" })
  
  return res.status(200).json(order)
 }




const createOrder = async (req, res, next) => {

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

}

const updateOrder = async (req, res, next) => {

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
  
}

deleteOrder = async (req, res, next) => {

 const order =  await Order.deleteOne({_id: req.params.id})

  return res.json({ status: true, order })

}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
}
