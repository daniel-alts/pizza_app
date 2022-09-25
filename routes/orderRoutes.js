const router = require('express').Router();

const orderController = require('../controllers/orderControllers');

router
	.route('/')
	.get(orderController.getOrders)
	.post(orderController.createOrder);

router
	.route('/total-price')
	.get(orderController.sortByTotalPrice, orderController.getOrders);

router
	.route('/state')
	.get(orderController.sortByState, orderController.getOrders);

router
	.route('/:id')
	.delete(orderController.deleteOrder)
	.put(orderController.updateOrder)
	.get(orderController.findOrder);

module.exports = router;
