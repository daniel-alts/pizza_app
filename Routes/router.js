const express = require("express")
const {authenticate} = require("../Middleware/authentication")
const {getOrderById, getOrders, updateOrders, deleteOrder, makeOrder} = require("../Controllers/orderControlller")

const router = express.Router()

router.post('/order', authenticate, makeOrder)

router.get('/order/:orderId', authenticate, getOrderById)

router.get('/orders', authenticate, getOrders)

router.patch('/order/:id', authenticate, updateOrders)

router.delete('/order/:id', authenticate, deleteOrder)

module.exports = router 
