const express = require('express')
const OrderController = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.post('/', OrderController.createOrder)

orderRouter.get('/:id', OrderController.getOrder)

orderRouter.get('/', OrderController.getOrders)

orderRouter.put('/:id', OrderController.updateOrder)

orderRouter.delete('/:id', OrderController.deleteOrder)


module.exports = orderRouter;