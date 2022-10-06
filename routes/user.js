const mongoose = require("mongoose");
const express = require("express");

const { signupUser, loginUser } = require("../controller/userController");

const router = express.Router();

//login routes
router.post("/login", loginUser);

//signup routes
router.post("/signup", signupUser);

module.exports = router;
