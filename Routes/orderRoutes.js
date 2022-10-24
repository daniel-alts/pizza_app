const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController")
// const OrderModel = require("../Models/orderModel")
// const userModel = require("../Models/userModel")
// const {authUser}= require("../middleware/auth")


router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:orderId")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router