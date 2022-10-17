const express = require('express')
const { create_order, get_order, get_orders, update_order, delete_order} = require('../controllers/orderController')
const { protect } = require('../middleware/auth_middleware')

const router = express.Router()

router.post('/', protect, create_order)

router.get('/:orderId', protect, get_order)

router.get('/', protect, get_orders)

router.patch('/order/:Id', protect, update_order)

router.delete('/order/:Id', protect, delete_order)

module.exports = router