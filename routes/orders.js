const express = require('express')
const router = express.Router()
const orderModel = require('../models/orderModel')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/orderController')

/**
 * Get information about all orders
 */
router.route('/info').get(authenticate, controller.getOrdersInfo)

/**
 * Get all orders
 * &&
 * Create new orders
 */
router.route('/').get(authenticate, controller.getAllOrders).post(authenticate, controller.createOrder)

/**
 * Get order by id
 */
router.route('/:orderId').get(authenticate, controller.getOrderById)

/**
 * Update order state
 * &&
 * Delete order by ID
 */
router.route('/:id').patch(authenticate, controller.updateOrder).delete(authenticate, controller.deleteOrder)

module.exports = router
