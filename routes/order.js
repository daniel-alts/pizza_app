const express = require("express");

const orderRouter = express.Router();

const order_controller = require("../controller/orderController");

orderRouter.get("/", order_controller.all_orders);

module.exports = orderRouter;
