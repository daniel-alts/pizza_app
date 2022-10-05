const express = require('express')
const router = express.Router()
const orderModel = require('../models/orderModel')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/orderController')

router.use(authenticate)

/**
 * Get information about all orders
 */
router.route('/info')
  .get(controller.getOrdersInfo)

/**
 * Get all orders
 * &&
 * Create new orders
 */
router.route('/')
  .get(controller.getAllOrders)
  .post(controller.createOrder)

/**
 * Get order by id
 */
router.route('/:orderId')
  .get(controller.getOrderById)

/**
 * Update order state
 * &&
 * Delete order by ID
 */
router.route('/:id')
  .patch(controller.updateOrder)
  .delete(controller.deleteOrder)

module.exports = router
