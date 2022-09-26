const express = require("express");
const { authorize } = require("../utils/authenticate.utils");
const {
	createUser,
	loginUser,
	logoutUser,
	getAllUsers,
} = require("../controllers/user.controller");

const userRoute = express.Router();

// Register user
userRoute.post("/register", createUser);

// Login
userRoute.post("/login", loginUser);

// Logout
userRoute.post("/logout", logoutUser);

// get all users
userRoute.get("/", authorize(["admin"]), getAllUsers);

module.exports = userRoute;
