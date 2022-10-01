const express = require("express")
const {authenticateRoute} = require("../Middleware/authentication")
const {getOrderById, getOrders, updateOrders, deleteOrder, makeOrder} = require("../Controllers/orderControlller")

const router = express.Router()

router.post('/', /*authenticateRoute,*/ makeOrder)

router.get('/:orderId', /*authenticateRoute,*/ getOrderById)

router.get('/orders', /*authenticateRoute,*/ getOrders)

router.patch('/:id', /*authenticateRoute,*/ updateOrders)

router.delete('/:id', /*authenticateRoute,*/ deleteOrder)

module.exports = router 
