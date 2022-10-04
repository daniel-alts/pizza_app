const orderModel = require("../models/orderModel");
const moment = require("moment");
const express = require("express");
const basicOauth = require("../middleware/authenticate.middleware");

const orderRoute = express.Router();

// post order routes
orderRoute.post("/", basicOauth, async (req, res) => {
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
});

// get order by id routes
orderRoute.get("/:orderId", basicOauth, async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

// get order routes
orderRoute.get("/", basicOauth, async (req, res) => {
  // get sorting values from query params if available
  const { price, date } = req.query;
  let sortBy = {};
  let orders;

  if (price) {
    const sortVal = price === "asc" ? 1 : price === "desc" ? -1 : false;
    if (sortVal) sortBy = { total_price: sortVal };
  } else if (date) {
    const sortVal = date === "asc" ? 1 : date === "desc" ? -1 : false;
    if (sortVal) sortBy = { created_at: sortVal };
  }

  if (!sortBy) {
    orders = await orderModel.find();
  } else {
    orders = await orderModel.find({}).sort(sortBy);
  }

  return res.json({ status: true, orders });
});

// Update order route
orderRoute.patch("/:id", basicOauth, async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  // check authorization before pulling from db
  if (req.authenticatedUser.role !== "admin") {
    return res.status(401).send("You're not authorised");
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
});

// delete order route
orderRoute.delete("/:id", basicOauth, async (req, res) => {
  const { id } = req.params;

  if (req.authenticatedUser.role !== "admin") {
    return res.status(401).send("You're not authorised");
  }
  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

module.exports = orderRoute;
