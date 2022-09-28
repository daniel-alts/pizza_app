const express = require('express')
const orderController = require('../controller/order')
const auth = require('../middleware/auth')
const role = require('../middleware/role')


const router = express.Router()


router.get('/', orderController.getOrders)
 
router.post('/', auth, orderController.createOrder)

router.get('/:id', auth, orderController.getOrder)

router.patch('/:id', [auth, role], orderController.updateOrder)

router.delete('/:id', [auth, role], orderController.deleteOrder)



module.exports = router