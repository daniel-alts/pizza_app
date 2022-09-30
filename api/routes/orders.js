const { Router } = require("express");
const controller = require("../controllers/order");

let router = Router();

/* Get all orders */
router.get("/list", controller.allOrders);
/* Get a single order */
router.get("/listOne/:orderId", controller.singleOrder);
/* Crete order */
router.post("/create", controller.createOrder);
/* Edit order */
router.patch("/order/:id", controller.editOrder);
/* Edit order */
router.delete("/delete/:id", controller.deleteOrder);

module.exports = router;
