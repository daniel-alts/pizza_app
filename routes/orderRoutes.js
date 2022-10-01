const orderRouter = require("express").Router();
const OrderController = require('../controllers/orderController')
//const {authenticateUser, admin} = require('../middleware/userAuth')
orderRouter
.post('/', OrderController.createOrder)
.get('/order' , OrderController.getAllOrder)
.get('/order/:orderId', OrderController.getaSingleOrder)
.patch('/order/:orderId', OrderController.updateOrder)
.delete('/order/:orderId', OrderController.cancelOrder)



module.exports = orderRouter