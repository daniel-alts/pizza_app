const orderRouter = require("express").Router();
const OrderController = require("../controls/orderController");

orderRouter
  .post("/order", OrderController.createOrder)
  .get("/getAllOrder", OrderController.getAllOrder)
  .get("/getaSingleOrder/:orderId", OrderController.getaSingleOrder)
  .patch("/updaterOrder/:orderId", OrderController.updateOrder)
  .delete("/cancelOrder/:orderId", OrderController.cancelOrder);

module.exports = orderRouter;
