const express = require("express");
const moment = require("moment");

const orderModel = require("../models/orderModel");

const pizzaRoute = express.Router();

pizzaRoute.post("/order", (req, res) => {
  const total_price = order.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const newOrder = orderModel.create({
    items: order.items,
    created_at: moment().toDate(),
    total_price,
  });

  return res.json({ status: true, newOrder });
});

pizzaRoute.get("/order/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

pizzaRoute.get("/orders", async (req, res, next) => {
  const { date_created, total_price, state } = req.query;

  try {
    let orders = await orderModel.find();

    if (date_created) {
      const sortedOrders = date_created === "asc"
        ? orders.sort((a, b) => a.created_at - b.created_at)
        : date_created === "dsc"
        ? orders.sort((a, b) => b.created_at - a.created_at)
        : orders;
    
        orders = sortedOrders;
    }

    if (total_price) {
      const sortedOrders =  total_price === "asc"
        ? orders.sort((a, b) => a.total_price - b.total_price)
        : total_price === "dsc"
        ? orders.sort((a, b) => b.total_price - a.total_price)
        : orders;

        orders = sortedOrders;
    }

    if (state) {
      const filteredOrders = orders.filter((order) => order.state == state);
      orders = filteredOrders;
    }

    return res.json({ status: true, numberOfRecords: orders.length, orders });
  } catch (error) {
        return next(error);
    }
});

pizzaRoute.patch("/order/:id", (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const order = orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: "Invalid operation" });
  }

  order.state = state;

  order.save();

  return res.json({ status: true, order });
});

pizzaRoute.delete("/order/:id", (req, res) => {
  const { id } = req.params;

  const order = orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

module.exports = pizzaRoute;
