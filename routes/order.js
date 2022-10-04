const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");
const mongoose = require("mongoose");
const orderModel = require("../model/orderModel");
const authenticate = require("../middlewares/authenticate");

/* Getting Info about all ordrs */
router.route("/info").get(authenticate, controller.getOrderInfo);

/*Getting all orders
and
Creating new orders
*/
router
    .route("/")
    .get(authenticate, controller.getAllOrders)
    .post(authenticate, controller.createOrder);

/**Get order by id */
router.route("/:orderId").get(authenticate, controller.getOrderById);

/*Update order state and Delete order by ID*/

router
    .route("/:id")
    .patch(authenticate, controller.updateOrder)
    .delete(authenticate, controller.deleteOrder);

module.exports = router;