const express = require("express");
const controller = require("../controllers/orderController");
const mongoose = require("mongoose");
const orderModel = require("../model/orderModel");
const authenticate = require("../middlewares/authenticate");

/* Getting Info about all ordrs */

const router = express.Router();
const {getOrderInfo, getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder} = controller

/*Getting all orders
and
Creating new orders
*/
router.get("/info", authenticate, getOrderInfo);
router.get("/", authenticate, getAllOrders)
router.post("/", authenticate, createOrder)

/**Get order by id */
router.get("/:orderId", authenticate, getOrderById);

/*Update order state and Delete order by ID*/
router.patch("/:id", authenticate, updateOrder)
router.delete("/:id", authenticate, deleteOrder)

module.exports = router;