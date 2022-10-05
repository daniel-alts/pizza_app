const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllerFunctions/orderFunc");

router.post("/", auth, createOrder);

router.get("/:orderId", getOrderById);

router.get("/", getAllOrders);

router.patch("/:id", auth,  updateOrder);

router.delete("/:id", auth, deleteOrder);

module.exports = router;
