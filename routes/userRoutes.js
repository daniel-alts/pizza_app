const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// const authUser = require("./../utils/authUser");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

module.exports = router;
