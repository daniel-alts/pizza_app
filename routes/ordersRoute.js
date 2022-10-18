const express = require("express");
const ordersRouter = express.Router();
const ordersController = require("../controllers/ordersController");

// GET all orders.
ordersRouter.get("/", ordersController.getAllOrders);

// POST an order.
ordersRouter.post("/", ordersController.postOrder);

// GET a single order.
ordersRouter.get("/:orderId", ordersController.getOrder);

// UPDATE a single order.
ordersRouter.patch("/:orderId", ordersController.updateOrder);

// DELETE a single order.
ordersRouter.delete("/:orderId", ordersController.deleteOrder);

module.exports = ordersRouter;
