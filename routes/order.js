const express = require("express");

const orderRouter = express.Router();

const order_controller = require("../controller/orderController");

orderRouter.get("/", order_controller.all_orders);

orderRouter.get("/:id", order_controller.order_by_id);

orderRouter.post("/", order_controller.create_order);

orderRouter.patch("/:id", order_controller.update_order);

orderRouter.delete("/:id", order_controller.delete_order);

module.exports = orderRouter;
