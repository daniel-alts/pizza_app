const express = require('express')
const router = express.Router()
const controller = require('../controllers/orderController')
const getToken = require('../middleware/getToken')
const getUser = require('../middleware/getUser')
const authorize = require('../middleware/authorize')

/**
 * Get information about all orders
 */
router.route('/info')
  .get(getToken, getUser, authorize, controller.getOrdersInfo)

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
