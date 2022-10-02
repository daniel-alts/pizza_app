const orderRouter = require("express").Router();
const OrderController = require('../controllers/orderController')
const {authenticateUser} = require('../middleware/auth')
orderRouter
.post('/', OrderController.createOrder)
.get('/order' , authenticateUser,OrderController.getAllOrder)
.get('/order/:orderId', authenticateUser, OrderController.getaSingleOrder)
.patch('/order/:orderId', OrderController.updateOrder)
.delete('/order/:orderId', OrderController.cancelOrder)



module.exports = orderRouter