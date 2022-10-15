const express = require('express');
const orderController = require('../controllers/orderController')
const orderRouter = express.Router();


//routes
orderRouter.post('/', orderController.createOrders)

orderRouter.get('/:id', orderController.getOneOrder);

orderRouter.get('/', orderController.getAllOrders);

orderRouter.put('/:id', orderController.updateOrder);

orderRouter.delete('/:id', orderController.deleteOrder)

//export
module.exports = orderRouter;