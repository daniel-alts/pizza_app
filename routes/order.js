const express = require('express');
const Order = require("../orderModel");
const moment = require("moment");

const orderModel = require("../orderModel");

const orderRoutes = express.Router();

orderRoutes.post("/order", async (req, res) => {
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

    return res.json({ status: true, order });
  });

  orderRoutes.get("/order/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ status: false, order: null });
    }

    return res.json({ status: true, order });
  });

  orderRoutes.get("/orders", async (req, res) => {
    const { queryState, sortWithPrice, sortWithDate, page } = req.query;
    // converting the objects retrieved from the query to integers
    const [queryOrderState, sortPrice, sortDate] = [
      parseInt(queryState),
      parseInt(sortWithPrice),
      parseInt(sortWithDate),
    ];

    const sortParams = {};
    // 1 for ascending and -1 for descending
    const validSortParams = [1, -1];

    let orderQuery = Order.find({});

    if (queryOrderState && [1, 2, 3].includes(queryOrderState)) {
      orderQuery = Order.find({ state: queryOrderState });
    }

    if (sortDate && validSortParams.includes(sortDate)) {
      sortParams.created_at = sortDate;
    }

    if (sortPrice && validSortParams.includes(sortPrice)) {
      sortParams.total_price = sortPrice;
    }

    const orders = await orderQuery
      .sort(sortParams)
      .limit(10)
      .skip((page - 1) * 10);

    return res.json({ status: true, orders });
  });

  orderRoutes.patch("/order/:id", async (req, res) => {
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

  orderRoutes.delete("/order/:id", async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id });

    return res.json({ status: true, order });
  });

module.exports = orderRoutes;