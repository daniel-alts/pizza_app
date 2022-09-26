const express = require('express');
const orderRoute = express.Router()
const {getAllOrders, getOrder, updateOrder, deleteOrder, addOrder} = require('../controllers/order')

orderRoute.route('/').get(getAllOrders).post(addOrder)
orderRoute.route('/:orderId').get(getOrder)
orderRoute.route('/:id').patch(updateOrder).delete(deleteOrder)


module.exports = orderRoute