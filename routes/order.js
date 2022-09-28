const express = require('express')
const orderRouter = express.Router()
const {createOrder,getAnOrder,getAllOrders,updateOrder,deleteOrder} = require('./controller/order.controller')


orderRouter.route('/').post(createOrder).get(getAllOrders);

orderRouter.route('/:orderId').get(getAnOrder).patch(updateOrder).get(deleteOrder);


// app.post('/order', createOrder)

// app.get('/order/:orderId', getAnOrder )

// app.get('/order', getAllOrders )

// app.patch('/order/:orderId', updateOrder)

// app.delete('/order/:orderId', deleteOrder)

module.exports = orderRouter