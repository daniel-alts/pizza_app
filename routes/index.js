const { Router } = require("express");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

const router = Router();

router.use("/users", userRoutes);
router.use("/orders", orderRoutes);

module.exports = router;


