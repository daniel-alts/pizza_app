const orderModel = require('../models/orderModel');
const moment = require('moment');

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
  });

  return res.json({ status: true, order });
};

const getOrders = async (req, res) => {
  const { sort_by } = req.query;
  const { state } = req.query;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  let orders;
  if (sort_by == 'total_price') {
    orders = await orderModel.find().sort({ total_price: -1 });
  } else if (sort_by == 'created_at') {
    orders = await orderModel.find().sort({ created_at: -1 });
  } else if (req.query.state) {
    orders = await orderModel.find({ state });
  } else {
    orders = await orderModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
  }
  res.status(200).json({ status: 'OK', orders });
  return;
};

const getOneOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  const order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: 'Invalid operation' });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order, msg: 'Order now deleted' });
};

module.exports = {
  createOrder,
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
};
