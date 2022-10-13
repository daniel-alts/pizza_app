const express = require('express');
const orderController = require('../controller/orderController');

const orderRouter = express.Router();


orderRouter.get('/', orderController.getOrder);
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:orderId', orderController.getOrderById);
orderRouter.patch('/:id', orderController.patchOrder);
orderRouter.delete('/:id', orderController.deleteOrderbyId);



module.exports = orderRouter;