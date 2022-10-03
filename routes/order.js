const express = require("express");
const { addOrders, getOrders, getOrdersById, patchOrder, deleteOrder, accessingOrder } = require("../controller/order");
require("dotenv").config();

const orderRouter = express.Router();

// const TOKEN = process.env.API_KEY;

orderRouter.use(accessingOrder);

orderRouter.post("", addOrders);

orderRouter.get("/:orderId", getOrdersById);

orderRouter.get("", getOrders);

orderRouter.patch("/:id", patchOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = {
  orderRouter,
};
