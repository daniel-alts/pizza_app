const express = require("express")
const orderRouter = express.Router()

const orderController = require("../controllers/orderController")
const { passwordAuth, adminAuth, userAuth } = require("../middleware/authMiddleware")
const errorMiddleware = require("../middleware/errorMiddleware")

orderRouter.post('/createOrder', [passwordAuth, userAuth], orderController.order, errorMiddleware)

orderRouter.get('/:orderId', [passwordAuth, adminAuth], orderController.getOrderById, errorMiddleware)

orderRouter.get('/', [passwordAuth, adminAuth], orderController.getAllOrder, errorMiddleware)
// you can sort the response from this /GET orders route by adding query params of: total_price=asc, created_at=asc, state=1|2|3|4, limit, and page

orderRouter.patch('/:id', [passwordAuth, adminAuth], orderController.updateOrder, errorMiddleware)

orderRouter.delete('/:id', [passwordAuth, adminAuth], orderController.deleteOrder, errorMiddleware)

module.exports = orderRouter