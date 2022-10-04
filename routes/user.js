const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
// const mongoose = require("mongoose");
const authenticate = require("../middlewares/authenticate");
const userModel = require("../model/userModel");

/*Get all users*/

router.route("/").get(authenticate, controller.getAllUsers);

/*Create new user*/
router.route("/register").post(controller.createUser);

module.exports = router;