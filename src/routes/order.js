const express = require("express");
const orderController = require("../controllers/orderController")

const orderRouter = express.Router();

orderRouter.get("/", orderController.getAllOrder)

orderRouter.get("/:orderId",  orderController.getOrderById)

orderRouter.post("/", orderController.createOrder)

orderRouter.patch("/:id", orderController.updateOrder)

orderRouter.delete("/:id", orderController.deleteOrder)


module.exports = orderRouter;