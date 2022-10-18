const express = require("express");
const ordersRouter = express.Router();
const ordersController = require("../controllers/ordersController");

ordersRouter
	.route("/")
	.get(ordersController.getAllOrders) // GET all orders.
	.post(ordersController.postOrder); // POST an order.

ordersRouter
	.route("/:orderId")
	.get(ordersController.getOrder) // GET a single order.
	.patch(ordersController.updateOrder) // UPDATE a single order.
	.delete(ordersController.deleteOrder); // DELETE a single order.

module.exports = ordersRouter;
