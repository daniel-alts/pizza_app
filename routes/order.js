const express = require('express');
const orderController = require('../controller/orderController');
const authenticate = require('../utils/authenticate');

const orderRouter = express.Router();


orderRouter.get('/', authenticate, orderController.getOrder);
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:orderId', authenticate, orderController.getOrderById);
orderRouter.patch('/:id', orderController.patchOrder);
orderRouter.delete('/:id', authenticate, orderController.deleteOrderbyId);



module.exports = orderRouter;