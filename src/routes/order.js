const express = require("express");
const moment = require("moment");
const orderModel = require("../models/orderModel");
const auth = require("../utils/basic_auth");
const Error = require("../utils/error");

const orderRouter = express.Router();

orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await orderModel.find();

    return res.json({ status: true, orders });
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);
    res.json({ status: true, order });
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/", async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    auth(authorization, req, res);
    const body = req.body;
    if(!body){
        throw new error(404, "body is null")
    }
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
  } catch (error) {
    next(error);
  }
});

orderRouter.patch("/:id", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

orderRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id });

    return res.json({ status: true, order });
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;
