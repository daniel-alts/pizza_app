const express = require('express');
const ordersController = require('../controllers/orders')
const {authenticateAdmin, authenticateUser} = require('../controllers/users')

const orderRouter = express.Router();


orderRouter.post('/',authenticateUser ,ordersController.makeOrder);

orderRouter.get('/:orderId',authenticateAdmin, ordersController.getOrderById);

orderRouter.get('/',authenticateAdmin, ordersController.getAllOrders);

orderRouter.patch('/:id',authenticateUser, ordersController.updateOrderById);

orderRouter.delete('/:id',authenticateAdmin, ordersController.deleteOrderById);

module.exports = orderRouter;