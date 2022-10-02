const orderModel = require('../model/orderModel');

const createOrder = async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await orderModel.create({
    items: body.items,
    total_price,
  });

  return res.json({ status: true, order });
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
};

const getAllOrders = async (req, res) => {
  const { state } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let orders = await orderModel
    .find()
    .sort({ createdAt: -1 })
    .sort({ total_price: 'asc' })
    .skip(skip)
    .limit(limit);

  if (state) {
    orders = orders.filter((order) => order.state === state);
  }

  return res.json({ status: true, orders });
};

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { state } = req.body;

  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { state: state },
    { new: true }
  );

  return res.json({ status: true, order });
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await orderModel.findByIdAndDelete(orderId);

  return res.json({ status: true, order });
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
