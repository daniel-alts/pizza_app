const express = require("express")
const orderRouter = express.Router()

const orderController = require("../controllers/orderController")

const errorMiddleware = require("../middleware/errorMiddleware")

orderRouter.post('/createOrder', orderController.order, errorMiddleware)

orderRouter.get('/:orderId', orderController.getOrderById, errorMiddleware)

orderRouter.get('/', orderController.getAllOrder, errorMiddleware)
// you can sort the response from this /GET orders route by adding query params of: total_price=asc, created_at=asc, state=1|2|3|4, limit, and page

orderRouter.patch('/:id', orderController.updateOrder, errorMiddleware)

orderRouter.delete('/:id', orderController.deleteOrder, errorMiddleware)

module.exports = orderRouter