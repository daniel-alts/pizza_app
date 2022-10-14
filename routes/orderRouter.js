const router = require("express").Router();
const authenticateUser = require("../middlewares/authentication");
const { getAllOrders } = require("../controllers/orderController");
const OrderAPI = require("../controllers/orderController");
const passport = require("pasport");
router.route("/").post(authenticateUser, OrderAPI.createOrder);
router.get("/all", getAllOrders);
router
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), OrderAPI.getOrderByID)
  .patch(passport.authenticate("jwt", { session: false }), OrderAPI.updateOrder)
  .delete(
    passport.authenticate("jwt", { session: false }),
    OrderAPI.deleteOrder
  );

module.exports = router;
