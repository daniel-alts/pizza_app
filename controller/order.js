const Order = require('../model/order')
const moment = require('moment');


const getOrders = async (req, res, next) => {
  try {
    const { total_price, created_at, state } = req.query
  const pageLimit = 4

  const queryParameter = {}
  if (total_price) {
    queryParameter.total_price = total_price
  }
  if (created_at) {
    queryParameter.created_at = created_at
  }
  if (state) {
    queryParameter.state = state
  }


  const currentPage = req.query.page || 1
  
  const paginate = (currentPage - 1) * pageLimit

  const orders = await Order.find()
    .skip(paginate)
    .sort(queryParameter)
  
  
 return res.status(200).json(orders)
 
  } catch (error) {
    next(error)
    
  }
}


const getOrder = async (req, res, next) => {

  try {
    const order = await Order.findById(req.params.id)

    if (!order) return res.status(404).json({ msg: "order not found" })
    
    return res.status(200).json(order)
  }catch(error) {
    next(error)
  }
 }




const createOrder = async (req, res, next) => {

  try {
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
}catch (error) {
  next(error)
}

}

const updateOrder = async (req, res, next) => {

  
  try {

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
  

  } catch (error) {
    next(error)
  }
}

deleteOrder = async (req, res, next) => {

try {
  const order =  await Order.deleteOne({_id: req.params.id})

  return res.json({ status: true, order })
} catch (error) {
  next(error)
  
}

}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
}
