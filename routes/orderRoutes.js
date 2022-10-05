const express = require('express')
const orderRouter = express.Router()

const orderController = require('../controllers/orderController')
const authenticatedUser = require('../middleware/authenticate')
orderRouter.post('/addorder', orderController.createOrder)
orderRouter.patch('/updateorder/:id', orderController.updateById)
orderRouter.delete('/deleteorder/:id', orderController.deleteOrderById)


orderRouter.route('/getorders/:id').get(authenticatedUser, orderController.getOrderById)

orderRouter.route('/getorders').get(authenticatedUser, orderController.getOrders)

module.exports = orderRouter
