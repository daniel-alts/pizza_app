const express = require("express");

const orderController = require("../controllers/ordercontroller");

const Router = express.Router();

Router.post("/", orderController.addOrders);

Router.patch("/:orderId", orderController.updateOrders);

Router.delete("/:orderId", orderController.deleteOrders);

Router.get("/:orderId", orderController.getAllOrderById);

Router.get("/", orderController.getAllOrder);

module.exports = Router;
