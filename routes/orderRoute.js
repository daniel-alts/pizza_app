const express = require('express')
const OrderController = require('../controllers/orderController');

const orderRoute = express.Router();

orderRoute.post('/', OrderController.createOrder)

orderRoute.get('/:orderId', OrderController.getOrderById)

orderRoute.get('/', OrderController.getAllOrders)

orderRoute.put('/:id', OrderController.updateOrderById)

orderRoute.delete('/:id', OrderController.deleteOrderById)


module.exports = orderRoute;