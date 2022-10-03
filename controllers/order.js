const orderModel = require("../models/orderModel");

const moment = require("moment");

//GET ALL ORDERS
const getAllOrder = async (req, res) => {
  //SORTING ORDERS

  const price = req.query.price;
  const date = req.query.date;

  let value;

  //SORING ORDERS BY PRICE IN ASCENDING OR DESCENDING ORDER
  if (price) {
    value = price;

    if (value === "asc") {
      value = 1;

      const orders = await orderModel.find().sort({ total_price: value });
      return res.status(200).json({ status: true, orders });
    } else if (value === "desc") {
      value = -1;

      const orders = await orderModel.find().sort({ total_price: value });
      return res.status(200).json({ status: true, orders });
    }
    //SORTING ORDERS BY DATE IN ASCENDING OR DESCENDING ORDER
  } else if (date) {
    value = date;
    if (value === "asc") {
      value = 1;

      const orders = await orderModel.find().sort({ created_at: value });
      return res.status(200).json({ status: true, orders });
    } else if (value === "desc") {
      value = -1;

      const orders = await orderModel.find().sort({ created_at: value });
      return res.status(200).json({ status: true, orders });
    }

    //IF USER DOESNT PASS A PRICE OR DATE OF THE ORDER THEN ALL ORDERS SHOULD BE RETURNED
  } else {
    const orders = await orderModel.find();
    return res.status(200).json({ status: true, orders });
  }
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
    return res.status(200).json({ status: true, order });
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

  return res.status(201).json({ status: true, order });
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

  return res.status(200).json({ status: true, order });
};

//DELETE ORDERS
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.status(200).json({ status: true, order });
};

module.exports = {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
