const express = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = express.Router();


// ORDER ROUTER FOR ALL ORDER CRUD OPERATIONS
orderRouter
  .route("/")
  .post(orderController.createOrder)
  .get(orderController.getAllOrder);

orderRouter
  .route("/:id")
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrder)
  .patch(orderController.updateOrder);

  
module.exports = orderRouter;
