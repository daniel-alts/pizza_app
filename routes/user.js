const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../models/userModel");

const userRoute = express.Router();

// Register user
userRoute.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const hashedPwd = await bcrypt.hash(password, 10);

	const user = await userSchema.create({ username, password: hashedPwd });

	await user.save();

	return res.status(201).send(user);
});

// Login
userRoute.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = await userSchema.findOne({ username });
	const isMatch = await bcrypt.compare(password, user.password);

	if (isMatch == true) {
		console.log("logged in!");
		req.session.user = user;
		return res.send(user);
	} else {
		return res.send("wrong ID or password");
	}
});

// Logout
userRoute.post("/logout", (req, res) => {
	req.session.user = null;
	return res.send("logged out");
});

// get all users
userRoute.get("/", async (req, res) => {
	const users = await userSchema.find({});
	return res.json({ data: users });
});

module.exports = { userRoute };
