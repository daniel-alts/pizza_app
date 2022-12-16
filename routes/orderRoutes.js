const express = require("express");
const orderValidatorMiddleware = require("../validators/order.validator");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(authController.restrictTo("admin"), orderController.getAllOrders)
  .post(orderValidatorMiddleware, orderController.createOrder);

router.route("/myorders").get(orderController.getAllMyOrders);
router.route("/myorders/:id").get(orderController.getMyOrder);

router
  .route("/:id")
  .get(authController.restrictTo("admin"), orderController.getOrder)
  .patch(authController.restrictTo("admin"), orderController.updateOrderState)
  .delete(authController.restrictTo("admin"), orderController.deleteOrder);

module.exports = router;
