const userRoutes = require("./user");
const orderRoutes = require("./orders");

const express = require("express");
const router = express.Router();
router.use(userRoutes);
router.use(orderRoutes);

module.exports = router;
