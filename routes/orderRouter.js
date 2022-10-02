const router = require("express").Router();
const authenticateUser = require("../middlewares/authentication");
const { getAllOrders } = require("../controllers/orderController");
const OrderAPI = require("../controllers/orderController");
router.route("/").post(authenticateUser, OrderAPI.createOrder);
router.get("/all", getAllOrders);
router
  .route("/:id")
  .get(authenticateUser, OrderAPI.getOrderByID)
  .patch(authenticateUser, OrderAPI.updateOrder)
  .delete(authenticateUser, OrderAPI.deleteOrder);

module.exports = router;
