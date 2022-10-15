const express = require('express')
//const app = require('.')

const orderController = require('./orderController')

const userController = require('./userController')
const auth = require('./authenticate')

const Router = express.Router()


//ORDER ROUTES

Router.get('/', orderController.getAllOrders)

Router.post('/', orderController.createOrder)

Router.get('/:id', orderController.getOrder)

Router.patch('/:id', orderController.updateOrder)

Router.delete('/:id', orderController.deleteOrder)




module.exports = Router