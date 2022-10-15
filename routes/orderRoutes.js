const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");
// const authOrder = require("../utils/authOrder.js");

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:orderId")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
