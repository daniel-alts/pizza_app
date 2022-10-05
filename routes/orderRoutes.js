const express = require('express');
const authorizeAdmin = require('../auth');
const OrderRouter = express.Router();
const orderController = require('../controller/orderController');

OrderRouter.post('/', orderController.createOrder);
OrderRouter.delete('/:id', orderController.deleteOrderbyId);
OrderRouter.get('/', authorizeAdmin, orderController.getOrders);
OrderRouter.get('/sort', orderController.sortOrderByPrice);
OrderRouter.get('/paginate', orderController.paginate);
OrderRouter.get('/date', orderController.sortOrderByDate);
OrderRouter.get('/price', orderController.sortOrderByPrice);
OrderRouter.get('/:id', authorizeAdmin, orderController.getOrderByID);
OrderRouter.patch('/:id', authorizeAdmin, orderController.updateOrder);

module.exports = OrderRouter;
