const orderModel = require("../model/orderModel");
const moment = require("moment");

const getAllOrders = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  const orders = await orderModel.find({}).skip(skip).limit(limit);
  return res.json({ status: true, orders });
};

const getOrdersTotalPrice = async (req, res) => {
  const ascending = await orderModel.find({}).sort({ total_price: -1 });
  return res.json({ status: true, ascending });
};

const getOrdersTime = async (req, res) => {
  const ascending = await orderModel.find({}).sort({ created_at: -1 });
  return res.json({ status: true, ascending });
};

const getOrdersState = async (req, res) => {
  const state = req.query.state;
  const stateOrder = await orderModel.find({ state: state });
  return res.json({ status: true, stateOrder });
};

const getOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
};

const createOrder = async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await orderModel.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
    // user: req.user.userId
  });

  return res.json({ status: true, order });
};

const updateOrder = async (req, res) => {
  const { id: id } = req.params;
  const { state } = req.body;

  const order = await orderModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
};

module.exports = {
  getAllOrders,
  getOrdersState,
  getOrdersTime,
  getOrdersTotalPrice,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
