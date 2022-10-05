const express = require('express')
const router = express.Router()
const Order = require("../modals/orderModel")
const authenticate = require('../middleware/authenticate')
const controller = require('../controller/orderController')





router.route('/info').get(authenticate,controller.getOrdersInfo)



router.route('/').get(authenticate,controller.getAllOrders).post(authenticate, controller.createOrder)



router.route('/:orderId').get(authenticate,controller.getOrderById)



router.route('/:id').patch(authenticate,controller.upDateOrder).delete(authenticate,controller.deleteOrder)



module.exports = router