const express = require("express");
const userController = require("../controllers/userController");
// const mongoose = require("mongoose");
const authenticate = require("../middlewares/authenticate");
const userModel = require("../model/userModel");



const router = express.Router();

const {getAllUsers, createUser, loginUser} = userController;
/*Get all users*/
router.get("/", getAllUsers)

// router.route("/").get(authenticate, controller.getAllUsers);

/*Create new user*/
router.post("/register", createUser);
router.post("/login", loginUser);


module.exports = router;