const orderModel = require("../models/orderModel");

const moment = require("moment");

//GET ALL ORDERS
const getAllOrder = async (req, res) => {
  const orders = await orderModel.find();

  return res.json({ status: true, orders });
};

//GET SINGLE ORDERS
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const order = await orderModel.findById(id);

    // console.log(order)
    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }
    return res.json({ status: true, order });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: err,
    });
  }
};

//CREATE ORDERS
const createOrder = async (req, res) => {
  const body = req.body;

  //   console.log(body);

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

//UPDATE ORDERS
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
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
};

//DELETE ORDERS
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
};

module.exports = {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
