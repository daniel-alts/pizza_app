const express = require("express");
const orderController = require("../controllers/orderController")

const orderRouter = express.Router();

  orderRouter.get("/", orderController.getOrders)
  orderRouter.get("/:orderId", orderController.getOrderById)
  orderRouter.post("/", orderController.addOrder)
  orderRouter.patch("/:id", orderController.updateOrder)
  orderRouter.delete("/:id", orderController.deleteOrder)

module.exports = orderRouter;