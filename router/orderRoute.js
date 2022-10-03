const express = require("express");

// const { loginUser } = require("../controllers/users");

const { authenticateUser } = require("../middleware/authenticate");

const orderRouter = express.Router();
const {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

orderRouter.get("/", getAllOrder);

orderRouter.get("/:id", authenticateUser, getOrderById);

orderRouter.post("/", authenticateUser, createOrder);

orderRouter.patch("/:id", authenticateUser, updateOrder);

orderRouter.delete("/:id", authenticateUser, deleteOrder);

module.exports = { orderRouter };
