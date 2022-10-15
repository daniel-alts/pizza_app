const orderModel = require("../models/orderModel");
const moment = require("moment");

//create orders

const createOrders = async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
      prev += curr.price * curr.quantity;
      return prev;
    }, 0);

    const order = await orderModel.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });
    try {
      return res.status(201).json({ status: true, order });
    } catch (error) {
      return res
        .status(500)
        .send("Error occurred while trying to create order");
    }
  
};

const getOneOrder = async (req, res) => {
  const { id } = req.params;
  const order = await orderModel.findById(id);
  try {
    return res.json({ status: true, order });
  } catch (error) {
    return res.status(404).json({ status: false, order: null });
  }
};

const getAllOrders = async (req, res) => {
 
  //sorting,querying and pagination
  let query = {};
  const { state } = req.query;
  if (state) {
    query = { state };
  }

  const { created_at } = req.query;
  const { total_price } = req.query;
  const { limit } = req.query;
 

  let totalPrice = {};
  let createdAt = {};
  let limitOrders = {};

  if (created_at === "asc") {
    createdAt = { created_at: 1 };
  } else if (created_at === "desc") {
    createdAt = { created_at: -1 };
  }
  if (!created_at) {
    createdAt = {};  
  }

  if (total_price === "asc") {
    totalPrice = { total_price: 1 };
  } else if (total_price === "desc") {
    totalPrice = { total_price: -1 };
  }
  if (!total_price) {
    totalPrice = {};
  }

  if (limit) {
    limitOrders = { limit: parseInt(limit) };
  }
  if (!limit) {
    limitOrders = {};
  }

  try {
  const orders = await orderModel.find(query).sort(totalPrice).sort(createdAt).limit(limitOrders.limit);
    return res.json({ status: true, orders });
  } catch (error) {
    return res.status(404).json({ status: false, orders: null });
  }
};

//update order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const newOrder = req.body;

  const order = await orderModel.findByIdAndUpdate(id, newOrder, { new: true });

  try {
    return res.json({ status: true, order });
  } catch (error) {
    return res
      .status(404)
      .json({ status: false, order: null, message: "something went wrong" });
  }
};

//delete order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });
  try {
    return res.status(200).send("order deleted successfully");
  } catch (error) {
    return res
      .status(404)
      .json({ status: false, order: null, message: "something went wrong" });
  }
};

//exports
module.exports = {
  createOrders,
  getOneOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
