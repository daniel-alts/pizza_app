const express = require("express")

const {getOrderById, getOrders, updateOrders, deleteOrder, makeOrder} = require("../Controllers/orderControlller")

const orderRouter = express.Router()

orderRouter.post('/', makeOrder)

orderRouter.get('/:orderId', getOrderById)

orderRouter.get('/orders', getOrders)

orderRouter.patch('/:id', updateOrders)

orderRouter.delete('/:id', deleteOrder)

module.exports = orderRouter 
