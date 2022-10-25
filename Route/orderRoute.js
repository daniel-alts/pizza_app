const express = require ("express")


const orderRouter = express.Router()


const { createOrder, getOrder, getOrders, updateOrder, deleteOrder } = require ("../controller/orderControler")

orderRouter.post("/order", createOrder)

orderRouter.get("/order/:orderId", getOrder)

orderRouter.get("/orders", getOrders)

orderRouter.patch("/order/:id", updateOrder)

orderRouter.delete("/order/:id", deleteOrder)


module.exports = orderRouter