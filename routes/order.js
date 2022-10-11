const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrdersState,
  getOrdersTime,
  getOrdersTotalPrice,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order");

const authenticateUser = require("../middleware/basicAuth");

router.route("/").post(authenticateUser, createOrder).get(getAllOrders);

router.get("/tp", getOrdersTotalPrice);
router.get("/time", getOrdersTime);
router.get("/state", getOrdersState);

router
  .route("/:id")
  .get(getOrder)
  .patch(authenticateUser, updateOrder)
  .delete(authenticateUser, deleteOrder);

module.exports = router;
