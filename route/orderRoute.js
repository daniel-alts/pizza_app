const express = require("express")
const orderRouter = express.Router()

const orderController = require("../controllers/orderController")
// const { passwordAuth, adminAuth, userAuth } = require("../handlers/authentication")
const errorHandler = require("../handlers/error_handler")
const { adminAuth } = require('../handlers/authentication')

orderRouter.post('/createOrder', orderController.order, errorHandler)

orderRouter.get('/:orderId', adminAuth , orderController.getOrderById, errorHandler)

orderRouter.get('/', adminAuth , orderController.getAllOrder, errorHandler)

orderRouter.patch('/:id', adminAuth , orderController.updateOrder, errorHandler)

orderRouter.delete('/:id', adminAuth , orderController.deleteOrder, errorHandler)

module.exports = orderRouter