const express = require("express");
const orderModel = require("../models/orderModel");
const moment = require("moment");
const router = express.Router();
const orderController = require("../controllers/orderController");

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrderState)
  .delete(orderController.deleteOrder);

module.exports = router;
