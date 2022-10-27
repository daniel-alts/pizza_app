const { Router } = require('express');
const orderController = require('../controller/orderController')

const orderRouter = Router();

orderRouter.post('/order', orderController.createOrder);

orderRouter.get('/order/:orderId', orderController.getOrderById);

orderRouter.get('/orders', orderController.getAllOrders); 

orderRouter.patch('/order/:id', orderController.updateOrder); 

orderRouter.delete('/order/:id', orderController.deleteOrder); 

module.exports = orderRouter;