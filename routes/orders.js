const express = require("express")
const orderControllers = require("../controllers/orders")
const router = express.Router()
const authenticate = require("../authenticate")

router.post("/order", authenticate, orderControllers.createOrder)
router.get("/order/:orderId", authenticate, orderControllers.getOrder)
router.get("/orders", orderControllers.getAllOrders)
router.patch("/orders/:id", authenticate, orderControllers.updateOrder)

module.exports = router

