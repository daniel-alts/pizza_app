const express = require("express");
const orderRoute = express.Router();

const orderController = require("../controllers/order.controllers")
const authenticated = require("../authenticate");


orderRoute.post('/', authenticated, orderController.addOrder );

orderRoute.get('/:orderId', authenticated, orderController.getOrderById);

orderRoute.get('/', authenticated, orderController.getOrder);

orderRoute.patch('/:id', authenticated, orderController.updateOrderById);

orderRoute.delete('/:id', authenticated, orderController.deleteOrderById);


module.exports = orderRoute