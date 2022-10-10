const orderRouter = require("express").Router();
const OrderController = require('../controllers/orderController');
//onst {authenticateUser} = require('../middleware/auth')
orderRouter
.post('/', OrderController.createOrder)
.get('/orders' ,OrderController.getAllOrder)
.get('/order/:orderId', OrderController.getaSingleOrder)
.patch('/order/:orderId', OrderController.updateOrder)
.delete('/order/:orderId', OrderController.cancelOrder)



module.exports = orderRouter