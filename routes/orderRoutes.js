const express = require("express");
const orderController = require("../controllers/orderController");
const userController = require('../controllers/userController')

const orderRouter = express.Router();


// ORDER ROUTER FOR ALL ORDER CRUD OPERATIONS
orderRouter
  .route("/")
  .post(userController.protect, orderController.createOrder)
  .get(userController.protect, orderController.getAllOrder);

orderRouter
  .route("/:id")
  .get(userController.protect, orderController.getOrderById)
  .delete(userController.protect, orderController.deleteOrder)
  .patch(userController.protect, orderController.updateOrder);

  
module.exports = orderRouter;
