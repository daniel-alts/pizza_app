const express = require("express")
const orderRouter = express.Router()

const orderController = require("../controllers/orderController")

orderRouter.post('/createOrder', orderController.order)
orderRouter.get('/:orderId', orderController.getOrderById)
orderRouter.get('/', orderController.getAllOrder)
orderRouter.patch('/:id', orderController.updateOrder)
orderRouter.delete('/:id', orderController.deleteOrder)

module.exports = orderRouter