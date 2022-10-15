const express = require('express');
const ordersController = require('../controllers/orders')
const passport = require('passport')

const orderRouter = express.Router();

orderRouter.use(passport.authenticate('jwt', { session: false }))

orderRouter.route('/').post(ordersController.makeOrder);

orderRouter.route('/:orderId').get(ordersController.getOrderById);

orderRouter.route('/').get(ordersController.getAllOrders);

orderRouter.route('/:id').patch(ordersController.updateOrderById);

orderRouter.route('/:id').delete(ordersController.deleteOrderById);

module.exports = orderRouter;