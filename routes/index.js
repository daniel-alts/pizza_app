const authRoutes = require("./auth");
const orderRoutes = require("./orders");

const express = require("express");
const router = express.Router();
router.use(authRoutes);
router.use(orderRoutes);

module.exports = router;
