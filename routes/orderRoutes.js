const express = require('express')
const orderRouter = express.Router()


// Import controller functions
const orderController = require('../controllers/orderController')

// import middleware functions
const authenticatedUser = require('../middleware/authenticate')

// use middleware function
orderRouter.use(authenticatedUser)

// creating url endpoints
orderRouter.post('/addorder', orderController.createOrder)
orderRouter.patch('/updateorder/:id', orderController.updateById)
orderRouter.delete('/deleteorder/:id', orderController.deleteOrderById)
orderRouter.get('/getorders', orderController.getOrders)
orderRouter.get('/getorders/:id', orderController.getOrderById)

// another method of creating url endpoints
// orderRouter.route('/getorders/:id').get(authenticatedUser, orderController.getOrderById)


// export router
module.exports = orderRouter
