const express = require('express');
const passport = require('passport');
const orderController = require('../controller/orderController');

const orderRoute = express.Router();

orderRoute.post('/order', orderController.createOrders)

orderRoute.get('/order/:orderId', passport.authenticate('jwt', { session: false }), orderController.getAllOrderById)

orderRoute.get('/orders',  orderController.getAllOrders)

orderRoute.patch('/order/:id', passport.authenticate('jwt', { session: false }),  orderController.updateOrders)

orderRoute.delete('/order/:id', passport.authenticate('jwt', { session: false }),  orderController.deleteOrder)

module.exports = orderRoute;
