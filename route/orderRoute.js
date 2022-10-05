const express = require("express")
const orderRouter = express.Router()

const orderController = require("../controllers/orderController")
const { passwordAuth, adminAuth, userAuth } = require("../handlers/authentication")
const errorHandler = require("../handlers/error_handler")

orderRouter.post('/createOrder', [passwordAuth, userAuth], orderController.order, errorHandler)

orderRouter.get('/:orderId', [passwordAuth, adminAuth], orderController.getOrderById, errorHandler)

orderRouter.get('/', [passwordAuth, adminAuth], orderController.getAllOrder, errorHandler)

orderRouter.patch('/:id', [passwordAuth, adminAuth], orderController.updateOrder, errorHandler)

orderRouter.delete('/:id', [passwordAuth, adminAuth], orderController.deleteOrder, errorHandler)

module.exports = orderRouter