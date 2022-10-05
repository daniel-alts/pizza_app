const express = require('express')
const orderRouter = express.Router()
const orderModel = require('../models/orderModel')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/orderController')

//order info
orderRouter.route('/info').get(authenticate, controller.OrderInfo)

// Get all orders
orderRouter.route('/').get(authenticate, controller.AllOrders)

//Create Orders
orderRouter.route('/create').post(authenticate, controller.addNewOrder)

// Get order by id
orderRouter.route('/:orderId').get(authenticate, controller.getOrderById)

//Update order state
orderRouter.route('/update/:id').patch(authenticate, controller.updateOrderById)

//delete order by id
orderRouter.route('/delete/:id').delete(authenticate, controller.deleteOrderById)

module.exports = orderRouter