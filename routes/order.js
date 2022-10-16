const express = require('express');
const {
	addOrder,
	getOrderById,
	getAllOrders,
	updateOrderById,
	deleteOrder,
} = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/', addOrder);
orderRouter.get('/:orderId', getOrderById);
orderRouter.patch(':id', updateOrderById);
orderRouter.delete(':id', deleteOrder);

module.exports = orderRouter;
