const express = require("express");
const orderRouter = express.Router();
const ordersController = require("../controllers/ordersController");
// const orderModel = require("./models/orderModel");

orderRouter.get("/", ordersController.getAllOrders);
orderRouter.post("/", ordersController.postOrder);
orderRouter.get("/:orderId", ordersController.getOrder);
orderRouter.patch("/:orderId", ordersController.updateOrder);
orderRouter.delete("/:orderId", ordersController.deleteOrder);

module.exports = orderRouter;
