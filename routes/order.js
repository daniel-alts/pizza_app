const express = require('express')
const orderRouter = express.Router()
const {createOrder,getAnOrder,getAllOrders,updateOrder,deleteOrder} = require('../controller/order')

const {accessControl} = require('../Access Control/accessMIddleware')



//All Signed in users have access to these Order routes
orderRouter.get('/', accessControl(["admin", "user"]), getAllOrders )
orderRouter.post('/',accessControl(["admin", "user"]), createOrder )

orderRouter.get('/:orderId',accessControl(["admin", "user"]), getAnOrder)

//Only Signed in administrative users have access to these routes
orderRouter.patch('/:orderId', accessControl(["admin"]), updateOrder)
orderRouter.delete('/:orderId', accessControl(["admin"]),  deleteOrder)

module.exports = orderRouter