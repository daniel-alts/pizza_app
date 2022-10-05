const express = require("express");

const orderController = require("../controllers/ordercontroller");
const { authenticateUser, authenticateAdmin } = require("../authorization");

const Router = express.Router();

// const user = orderController.
// only the authenticated users allowed to patch and delete orders
Router.use(authenticateUser);
Router.patch("/:orderId", orderController.updateOrders);

Router.delete("/:orderId", orderController.deleteOrders);

Router.post("/", orderController.addOrders);
// only admins are allowed to get orders
Router.use(authenticateAdmin);
// Router.use(authenticateUser);

Router.get("/:orderId", orderController.getAllOrderById);

Router.get("/", orderController.getAllOrder);

module.exports = Router;
