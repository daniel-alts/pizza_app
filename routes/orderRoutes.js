const mongoose = require("mongoose");
const express = require("express");
// const router = require("mongoose").Router();
const {
  getOrders,
  getOneOrder,
  makeOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

const requireAuth = require("../middleware/basicauth")
// const router = mongoose.Router();
const router = express.Router();

//require Auth for all other
// router.use(requireAuth)

//testing out our routes route
// router.get("/", () => {});

//making new order
router.post("/", makeOrder);

//get a single order
router.get("/:orderId", getOneOrder);

//get all user mdoel
router.get("/", getOrders);

//update an order
router.patch("/:id", updateOrder);

//delete an order
router.delete("/:id", deleteOrder);

module.exports = router;
