const orderModel = require("../models/orderModel");
const mongoose = require("mongoose");
const moment = require("moment");

// Get all orders
const getAllOrders = async (req, res) => {
  const orders = await orderModel.find();

  return res.status(200).json({ status: true, orders });
};
// Get a single order
const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({ error: "No such Id" });
  }

  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
};

// Post/Create orders
const createOrder = async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);
  try {
    const order = await orderModel.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });

    return res.json({ status: true, order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update Order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Id" });
  }

  const order = await orderModel.findById(id);

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

// Delete order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Id" });
  }

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
