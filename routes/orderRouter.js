const express = require("express");
const {
  createNewOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.post("/", createNewOrder);
orderRouter.get(":orderId", getOrderById);
orderRouter.get("/", getAllOrders);
orderRouter.patch("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
