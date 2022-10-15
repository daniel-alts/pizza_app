const express = require("express");
const controller = require("../controllers/orderController");



const router = express.Router();
const { getOrderInfo, getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder } = controller


/* Getting Info about all ordrs */
router.get("/info", getOrderInfo);

/*Getting all orders
&&
Creating new orders
*/
router.get("/", getAllOrders)
router.post("/", createOrder)

/**Get order by id */
router.get("/:orderId", getOrderById);

/*Update order state and Delete order by ID*/
router.patch("/:id", updateOrder)
router.delete("/:id", deleteOrder)

module.exports = router;