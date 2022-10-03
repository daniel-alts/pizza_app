const express = require("express");
const ordersRouter = express.Router();
const orderModel = require("../models/orderModel");
const moment = require("moment");
const { validateAdmin, validateLoginDetails } = require("../authenticate");

// Create an order
ordersRouter.post("/", validateLoginDetails, async (req, res) => {
  const body = req.body.itemsBody;

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

// Get an order by Id
ordersRouter.get("/:orderId", validateLoginDetails, async (req, res) => {
  const { orderId } = req.params;

  const order = await orderModel.findById(orderId);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
});

// Get all orders
ordersRouter.get("/", validateAdmin, async (req, res) => {
  const perPage = 2;
  const pageNumber = parseInt(req.query.pageNumber);

  const orders = await orderModel
    .find()
    .skip(perPage * pageNumber)
    .limit(perPage)
    .sort({ total_price: -1, created_at: -1, state: -1 });

  return res.json({ status: true, orders });
});

// Update an order by id
ordersRouter.patch("/:id", validateLoginDetails, async (req, res) => {
  const { id } = req.params;
  const { state } = req.body.itemsBody;

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

// Delete an order by Id
ordersRouter.delete("/:id", validateLoginDetails, async (req, res) => {
  const { id } = req.params;

  const order = await orderModel.deleteOne({ _id: id });

  return res.json({ status: true, order });
});

module.exports = ordersRouter;
