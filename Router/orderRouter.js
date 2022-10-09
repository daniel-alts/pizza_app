const express = require("express");

// const { loginUser } = require("../controllers/users");

const { authenticateUser } = require("../middlewear/middlewear");

const orderRouter = express.Router();
const {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

orderRouter.get("/", authenticateUser, getAllOrder);

orderRouter.get("/:id", authenticateUser, getOrderById);

orderRouter.post("/orders", authenticateUser, createOrder);

orderRouter.patch("/:id", authenticateUser, updateOrder);

orderRouter.delete("/:id", authenticateUser, deleteOrder);

module.exports = { orderRouter };