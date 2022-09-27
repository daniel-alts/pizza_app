const express = require("express");
const { authenticateUser, authorize } = require("../utils/authenticate.utils");
const {
	createOrder,
	getOrderById,
	getAllOrders,
	updateOrder,
	deleteOrder,
} = require("../controllers/order.controller");

const orderRoute = express.Router();

orderRoute.post("/", authenticateUser, authorize(["user", "admin"]), createOrder);

orderRoute.get("/:orderId", authenticateUser, authorize(["user", "admin"]),  getOrderById);

orderRoute.get("/", authenticateUser, authorize(["user", "admin"]), getAllOrders);

orderRoute.patch("/:id", authenticateUser, authorize(["admin"]), updateOrder);

orderRoute.delete("/:id", authenticateUser, authorize(["admin"]), deleteOrder);

module.exports = orderRoute;
