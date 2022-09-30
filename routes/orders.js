const router = require("express").Router();
const auth = require("../authentication/auth");
const orderController = require("../controllers/orderController");

router.get(
	"/",
	auth.authenticateUser,
	orderController.getOrders
);

router.post(
	"/",
	auth.authenticateUser,
	orderController.postOrder
);

router.get(
	"/:orderId",
	auth.authenticateUser,
	orderController.getOrder
);

router.patch(
	"/:id",
	auth.authenticateUser,
	orderController.updateOrder
);

router.delete(
	"/:id",
	auth.authenticateUser,
	orderController.deleteOrder
);

module.exports = router;
