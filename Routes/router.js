const express = require("express")
const {authenticate} = require("../Middleware/authentication")
const {getOrderById, getOrders, updateOrders, deleteOrder, makeOrder} = require("../Controllers/orderControlller")

const router = express.Router()

router.post('/', authenticate, makeOrder)

router.get('/:orderId', authenticate, getOrderById)

router.get('/orders', authenticate, getOrders)

router.patch('/:id', authenticate, updateOrders)

router.delete('/:id', authenticate, deleteOrder)

module.exports = router 
