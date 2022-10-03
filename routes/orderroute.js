const express = require('express');

const orderRouter = express.Router();

const { getAllOrders,getOrdeById,createOrder,updateOrder,deleteOrder } = require('../controller/ordercontroller')
const authuser = require('../middleware/auth');
orderRouter.route('/').get(authuser,getAllOrders).post(authuser,createOrder);
orderRouter.route('/:id').get(authuser,getOrdeById).patch(authuser,updateOrder).delete(authuser,deleteOrder);

module.exports = orderRouter;