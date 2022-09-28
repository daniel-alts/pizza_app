const router = require("express").Router();
const { getAllOrders } = require("../controllers/orderController");
const OrderAPI = require("../controllers/orderController");
router.post("/", OrderAPI.createOrder);
router.get("/all", getAllOrders);
router
  .route("/:id")
  .get(OrderAPI.getOrderByID)
  .patch(OrderAPI.updateOrder)
  .delete(OrderAPI.deleteOrder);

module.exports = router;
