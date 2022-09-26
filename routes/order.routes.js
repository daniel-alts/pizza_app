const express = require("express");
const { authenticateUser, authorize } = require("../utils/authenticate.utils");
const {
	createOrder,
	getOrderById,
	getAllOrders,
	updateOrder,
	deleteOrder,
} = require("../controllers/order.controller");
const Role = require("../utils/roles.utils");

const orderRoute = express.Router();

orderRoute.post("/", authenticateUser, authorize(Role), createOrder);

orderRoute.get("/:orderId", authenticateUser, authorize(Role),  getOrderById);

orderRoute.get("/", authenticateUser, authorize(Role), getAllOrders);

orderRoute.patch("/:id", authenticateUser, authorize(Role.Admin), updateOrder);

orderRoute.delete("/:id", authenticateUser, authorize(Role.Admin), deleteOrder);

module.exports = { orderRoute };
