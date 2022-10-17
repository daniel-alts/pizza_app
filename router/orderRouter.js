const express = require('express');
// const moment = require('moment')
// const { authenticateUser } = require('../middleware/authenticate');
// const orderModel = require('../models/orderModel');
const orderController = require('../controller/orderController')

const orderRouter = express.Router()

orderRouter.post('/', orderController.createNewOrder)

orderRouter.get('/:orderId', orderController.getOrderById)

orderRouter.get('/',  orderController.getAllOrders)

orderRouter.patch('/:id',  orderController.updateOrder)

orderRouter.delete('/:id', orderController.deleteOrder)
    

module.exports = orderRouter