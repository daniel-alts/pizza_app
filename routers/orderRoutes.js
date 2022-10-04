const express = require('express');
const orderController = require('../controllers/order')
const usersController = require('../controllers/user')

const router = express.Router()

router.get('/', orderController.getAllOrders)
// router.get('/:sort/price', orderController.getAllOrders) =>sort total price from ascending to descending, sort created date also

router.get('/:id', orderController.getOrderById)
router.post('/', orderController.addOrder)
router.patch('/:id', orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = router;