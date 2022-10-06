const express = require('express')
const orderRouter = express.Router()
const {createOrder,getAnOrder,getAllOrders,updateOrder,deleteOrder} = require('../controller/order')


orderRouter.route('/').post(createOrder).get(getAllOrders);

orderRouter.route('/:orderId').get(getAnOrder).patch(updateOrder).delete(deleteOrder);

module.exports = orderRouter