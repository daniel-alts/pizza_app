const express = require("express")

const {getOrderById, getOrders, updateOrders, deleteOrder, makeOrder} = require("../Controllers/orderControlller")

const router = express.Router()

router.post('/', makeOrder)

router.get('/:orderId', getOrderById)

router.get('/orders', getOrders)

router.patch('/:id', updateOrders)

router.delete('/:id', deleteOrder)

module.exports = router 
