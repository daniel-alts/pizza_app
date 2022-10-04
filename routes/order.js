const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/order')
const isAuthenticated = require('../authenticate')

orderRouter.post('/', isAuthenticated, orderController.addOrder);

orderRouter.get('/:orderId', isAuthenticated, orderController.getOrderById);

orderRouter.get('/', isAuthenticated, orderController.getOrder);

orderRouter.patch('/:id', isAuthenticated, orderController.updateOrderById);

orderRouter.delete('/:id', isAuthenticated, orderController.deleteOrderById);

module.exports = orderRouter