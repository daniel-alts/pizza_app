const express = require('express');
// const moment = require('moment')
const { authenticateUser } = require('../middleware/authenticate');
// const orderModel = require('../models/orderModel');
const orderController = require('../controller/orderController')

const orderRouter = express.Router()

orderRouter.post('/',authenticateUser, orderController.createNewOrder)

orderRouter.get('/:orderId',authenticateUser, orderController.getOrderById)

orderRouter.get('/', authenticateUser, orderController.getAllOrders)

orderRouter.patch('/:id', authenticateUser, orderController.updateOrder)

orderRouter.delete('/:id', authenticateUser, orderController.deleteOrder)
    

module.exports = orderRouter