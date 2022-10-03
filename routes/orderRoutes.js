const { Router } = require("express");
const orderController = require("../controllers/order");
const authenticate = require("../auth/auth");


const router = Router();

router.post("/create", authenticate, orderController.createOrder);

router.get("/", authenticate, orderController.getAllOrders);
router.get("/:orderId", authenticate, orderController.getOrdersById);

router.patch("/:orderId", authenticate, orderController.updateOrder);

router.delete("/:orderId", authenticate, orderController.deleteOrder);

module.exports = router;