const router = require('express').Router();
const orderController = require('../controllers/orderControllers');

router
	.route('/')
	.get(orderController.getOrders)
	.post(orderController.createOrder);

router
	.route('/:id')
	.delete(orderController.deleteOrder)
	.put(orderController.updateOrder)
	.get(orderController.findOrder);

module.exports = router;
