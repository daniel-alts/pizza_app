const express = require("express");
const moment = require("moment");
const orderModel = require("../models/orderModel");

const { isLoggedIn } = require("../middleware/auth");

const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  return res.json({ status: true });
});

//Add Order
orderRouter.post("/order", isLoggedIn, async (req, res) => {
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

//Get Order by Id
orderRouter.get("/order/:orderId", isLoggedIn, async (req, res) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

//Get order by order by ascending order of date and total price
orderRouter.get("/orders", isLoggedIn, async (req, res) => {
  const orders = await orderModel
    .find()
    .sort({ total_price: 1, created_at: 1 });

  return res.json({ status: true, orders });
});

//get orders by state
orderRouter.get("/orders/:state", isLoggedIn, async (req, res) => {
  const { state } = req.params;

  const orders = await orderModel.find({ state }).exec();

  return res.json({ status: true, orders });
});

//get orders
orderRouter.get("/orders", isLoggedIn, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  const orders = await orderModel
    .find()
    .sort({ id })
    .limit({ limit })
    .skip(skipIndex)
    .exec();

  return res.json({ status: true, orders });
});

//Update Orders
orderRouter.patch("/order/:id", isLoggedIn, async (req, res) => {
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

//Delete orders
orderRouter.delete("/order/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

module.exports = orderRouter;
