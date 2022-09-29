const express = require("express")
const orderRouter = express.Router()

const orderController = require("../controllers/orderController")
const { passwordAuth, adminAuth, userAuth } = require("../middleware/authMiddleware")

orderRouter.post('/createOrder', [passwordAuth, userAuth], orderController.order)
orderRouter.get('/:orderId', [passwordAuth, adminAuth], orderController.getOrderById)
orderRouter.get('/', [passwordAuth, adminAuth], orderController.getAllOrder)
orderRouter.patch('/:id', [passwordAuth, adminAuth], orderController.updateOrder)
orderRouter.delete('/:id', [passwordAuth, adminAuth], orderController.deleteOrder)

module.exports = orderRouter