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

// const { authenticateUser } = require("../middleware/authentication");

router.route("/").post(createOrder).get(getAllOrders);

router.get("/tp", getOrdersTotalPrice);
router.get("/time", getOrdersTime);
router.get("/state", getOrdersState);

router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
