const express = require("express");
const orderController = require("../controllers/orderController");
const userController = require('../controllers/userController')

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(orderController.createOrder)
  .get(userController.auth, orderController.getAllOrder);

orderRouter
  .route("/:id")
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrder)
  .patch(orderController.updateOrder);

module.exports = orderRouter;
