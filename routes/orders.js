const express = require("express");
const orderControllers = require("../controllers/orders");
const router = express.Router();
const authenticate = require("../authenticate");
const passport = require("passport");

router.post(
  "/order",
  passport.authenticate("jwt", { session: false }),
  orderControllers.createOrder
);
router.get(
  "/order/:orderId",
  passport.authenticate("jwt", { session: false }),
  orderControllers.getOrder
);
router.get("/orders", orderControllers.getAllOrders);
router.patch("/orders/:id", authenticate, orderControllers.updateOrder);

module.exports = router;
