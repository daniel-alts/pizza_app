const express = require("express");

const { adminAuthorizeHandler } = require("../auth");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
} = require("../controllers/orderControllers");

const router = express.Router();

router.post("/", createOrder);

// Authorize Admin
router.use(adminAuthorizeHandler);

router.get("/", getAllOrders);

router.get("/:orderId", getOrder);

router.patch("/:orderId", updateOrder);

router.delete("/:orderId", deleteOrder);

module.exports = router;
