const orders = require('express').Router();
const orderController = require('../controllers/order.controller');

orders
.route('/')
.get(orderController.getOrders)
.post(orderController.createOrder)



orders
.route('/:_id')
.get(orderController.getOrder)
.patch(orderController.updateOrder)
.delete(orderController.deleteOrder)

module.exports = orders;

