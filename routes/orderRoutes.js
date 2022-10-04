const router = require('express').Router();
const orderController = require('../controllers/orderControllers');
const { Auth } = require('../controllers/auth');

// Basic Users Routes.
router
	.route('/')
	.get(Auth, orderController.queryByRole, orderController.getOrders)
	.post(Auth, orderController.createOrder);

router
	.route('/:id')
	.delete(Auth, orderController.deleteOrder)
	.put(Auth, orderController.updateOrder);

//  ! admin Privileges only
// only admins should be able to sort all orders
router
	.route('/state')
	.get(Auth, orderController.sortByState, orderController.getOrders);

router
	.route('/total-price')
	.get(
		Auth,
		orderController.sortByTotalPrice,
		orderController.getOrders,
	);

router
	.route('/dateCreated')
	.get(Auth, orderController.sortByDate, orderController.getOrders);

module.exports = router;
