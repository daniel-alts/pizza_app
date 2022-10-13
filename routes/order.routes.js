const express = require("express");
const { authenticateUser, authorize } = require("../utils/auth.utils");
const {
	createOrder,
	getOrderById,
	getAllOrders,
	updateOrder,
	deleteOrder,
} = require("../controllers/order.controller");

const orderRoute = express.Router();

orderRoute.post("/", createOrder);

orderRoute.get("/:orderId", getOrderById);

orderRoute.get("/", getAllOrders);

orderRoute.patch("/:id", updateOrder);

orderRoute.delete("/:id", deleteOrder);

module.exports = orderRoute;
