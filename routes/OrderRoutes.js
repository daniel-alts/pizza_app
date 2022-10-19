const express = require('express')
const OrderController = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.post('/order', OrderController.createOrder)

orderRouter.get('/order/:orderId', OrderController.getOrder)

orderRouter.get('/orders', OrderController.getOrders)

orderRouter.patch('/order/:id', OrderController.updateOrder)

orderRouter.delete('/order/:id', OrderController.deleteOrder)


module.exports = orderRouter;