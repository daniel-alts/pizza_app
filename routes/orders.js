const express = require("express");
const moment = require("moment");
const authUser = require("../authentication/auth");
const Order = require("../model/order");

const orderRoute = express.Router();

orderRoute.get("/", async (req, res) => {
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 100;
  let skip = (page - 1) * limit;
  let orders = await Order.find({}).skip(skip).limit(limit);
  return res.json({ status: true, orders });
});

// Sort the total_price from ascending to descending
orderRoute.get("/total-price", async (req, res) => {
  const asc = await Order.find({}).sort({ total_price: -1 });
  return res.json({ status: true, asc });
});

// Sort the date created from asc to desc
orderRoute.get("/date-created", async (req, res) => {
  const asc = await Order.find({}).sort({ created_at: -1 });
  return res.json({ status: true, asc });
});

// Query orders by state
orderRoute.get("/query", async (req, res) => {
  const state = req.query.state;
  const orders = await Order.find({ state: state });
  return res.status(200).json(orders);
});

//Make a new pizza order
orderRoute.post("/order", authUser, async (req, res) => {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await Order.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
  });

  return res.json({ status: true, order });
});

//Find an order by id
orderRoute.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

//Get all orders from database
orderRoute.get("/orders", async (req, res) => {
  const orders = await Order.find();

  return res.json({ status: true, orders });
});

//Update an order by id
orderRoute.patch("/order/:id", authUser, async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  const order = await Order.findById(id);

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
});

//Delete an order by id
orderRoute.delete("/order/:id", authUser, async (req, res) => {
  const { id } = req.params;
  const order = await Order.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

module.exports = orderRoute;
