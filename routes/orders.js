const router = require("express").Router();
const auth = require("../authentication/auth");
const orderController = require("../controllers/orderController");

router
	.route("/")
	.get(
		auth.authenticateUser,
		orderController.getOrders
	)
	.post(orderController.postOrder);

router
	.route("/:id")
	.get(
		auth.authenticateUser,
		orderController.getOrder
	)
	.patch(
		auth.authenticateUser,
		orderController.updateOrder
	)
	.delete(
		auth.authenticateUser,
		orderController.deleteOrder
	);

module.exports = router;
