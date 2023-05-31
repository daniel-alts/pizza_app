const express = require('express')
const OrderController = require('../controllers/orderController');
const GetOrderCacheMiddleware = require('../middleware/getOrderCacheMiddleware');

const orderRouter = express.Router();

orderRouter.post('/', OrderController.createOrder)

orderRouter.get('/:orderId', GetOrderCacheMiddleware, OrderController.getOrder)

orderRouter.get('/', OrderController.getOrders)

orderRouter.patch('/:id', OrderController.updateOrder)

orderRouter.delete('/:id', OrderController.deleteOrder)


module.exports = orderRouter;