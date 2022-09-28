const express = require('express')
const orderController = require('../controller/order')

const router = express.Router()


router.get('/', orderController.getOrders)
 
router.post('/', orderController.createOrder)

router.get('/:id', orderController.getOrder)

router.patch('/:id', orderController.updateOrder)

router.delete('/:id', orderController.deleteOrder)



module.exports = router