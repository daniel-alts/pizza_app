const express = require ("express")
const basicAuth = require ("../middleware/basicAuth")

const orderRouter = express.Router()

orderRouter.use(basicAuth)

const { createOrder, getOrder, getOrders, updateOrder, deleteOrder } = require ("../controller/orderControler")

orderRouter.post("/order", basicAuth, createOrder)

orderRouter.get("/order/:orderId", basicAuth, getOrder)

orderRouter.get("/orders", basicAuth, getOrders)

orderRouter.patch("/order/:id", basicAuth, updateOrder)

orderRouter.delete("/order/:id", basicAuth, deleteOrder)


module.exports = orderRouter