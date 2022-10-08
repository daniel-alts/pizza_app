const express = require("express");
const orderRoute = express.Router();
const moment = require("moment");
const orderModel = require("../models/orderModel");

orderRoute.post("/order", async (req, res) => {
  console.log(req.body);
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

orderRoute.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

orderRoute.get("/orders", async (req, res) => {
  const { page = 1, limit = 5, state } = req.query;
  const sort = [];

  for (const param in req.query) {
    if (["total_price", "created_at"].includes(param)) {
      const direction = req.query[param];
      const sort_direction = direction == "asc" ? 1 : -1;
      const row_sort = [param, sort_direction];
      sort.push(row_sort);
    }
  }

  const filter = {};
  if (state) {
    filter.state = state;
  }

  const orders = await orderModel
    .find(filter)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  return res.json({ status: true, orders });
});

orderRoute.patch("/order/:id", async (req, res) => {
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
});

orderRoute.delete("/order/:id", async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

orderRoute.get("/created", async (req, res) => {
  try {
    const orderCreated = await orderModel.aggregate([
      { $sort: { created_at: 1, _id: 1 } },
      {
        $project: {
          month: { $month: "$created_at" },
        },
      },
    ]);
    res.status(200).json(orderCreated);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = orderRoute;
