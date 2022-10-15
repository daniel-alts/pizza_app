const express = require('express');
const passport = require('passport')
const orderController = require("../controllers/orderController");
const router = express.Router();
const auth = require("../middleware/auth")

router.post(
    "/order", passport.authenticate("jwt", {session: false }),
    orderController.createOrder
);

router.get(
    "/order/:orderId", passport.authenticate("jwt", {session: false }),
    orderController.getaSingleOrder
);

router.get(
    "/order/:orders", passport.authenticate("jwt", { session: false }),
    orderController.getAllOrder
);
router.patch("/order/:id", passport.authenticate("jwt", { session: false}),
    orderController.updateOrder
);
router.delete("/order:orderId", passport.authenticate("jwt", { session: false}),
    orderController.cancelOrder
);

module.exports = router
