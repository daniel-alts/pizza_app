const orders = require('express').Router();
const orderController = require('../controllers/order.controller');
const passport = require('passport');
const { userauth, adminauth } = require('../middleware/auth')
//orders.use(passport.authenticate('jwt', { session: false}));


orders
.route('/')
.get(orderController.getOrders)
.post(userauth, orderController.createOrder)



orders
.route('/:_id')
.get(userauth, orderController.getOrder)
.patch(userauth, orderController.updateOrder)
.delete(userauth, orderController.deleteOrder)

module.exports = orders;

