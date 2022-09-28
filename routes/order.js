const express = require("express");
const router = express.Router();
const moment = require("moment");
const {
  createOrder,
  getAllOrders,
  getSingleOrder, 
  updateOrder, 
  deleteOrder
} = require("../controllerFunctions/orderFunc");

router.post("/", createOrder);

router.get("/:orderId", getSingleOrder);

router.get("/", getAllOrders);

router.patch("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
