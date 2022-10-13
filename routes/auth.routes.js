const express = require("express");
const passport = require("passport");

const {
	createUser,
	loginUser,
	// logoutUser,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

// Register user
authRouter.post(
	"/register",
	passport.authenticate("register", { session: false }),
	createUser
);

// Login
authRouter.post("/login", loginUser);

// // Logout
// userRoute.post("/logout", logoutUser);

module.exports = authRouter;
