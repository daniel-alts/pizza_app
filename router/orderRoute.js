const express = require("express");

// const { loginUser } = require("../controllers/users");

// const { authenticateUser } = require("../Basic_auth/authenticate");

const orderRouter = express.Router();
const {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

orderRouter.get("/", getAllOrder);

orderRouter.get("/:id", getOrderById);

orderRouter.post("/", createOrder);

orderRouter.patch("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = { orderRouter };
