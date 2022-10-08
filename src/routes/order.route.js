const orders = require('express').Router();

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

