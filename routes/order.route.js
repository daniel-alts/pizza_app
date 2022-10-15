const passport = require('passport');
const orderRouter = require('express').Router();
const orderController = require('../controllers/orders.controller');

// Orders Routes
orderRouter.get('/', orderController.getOrders);
orderRouter.get('/:orderId', orderController.getOrderById);
orderRouter.post('/', passport.authenticate('jwt', { session: false }), orderController.makeOrder);
orderRouter.put('/:id', passport.authenticate('jwt', { session: false }), orderController.updateOrder);
orderRouter.delete('/:id', passport.authenticate('jwt', { session: false }), orderController.deleteOrder);

module.exports = orderRouter;
