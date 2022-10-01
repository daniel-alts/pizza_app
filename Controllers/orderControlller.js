const orderModel = require('../Models/orderModel');

const makeOrder = asyncHandler(async (req, res) => {
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
} )

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId)

  if (!order) {
      return res.status(404).json({ status: false, order: null })
  }

  return res.json({ status: true, order })
})

const getOrders = asyncHandler( async (req, res) => {
  const orders = await orderModel.find()

  return res.json({ status: true, orders })
})

const updateOrders = asyncHandler( async (req, res) => {
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

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id})

  return res.json({ status: true, order })
})

module.exports = {
  getOrderById,
  getOrders,
  updateOrders,
  deleteOrder,
  makeOrder
}
