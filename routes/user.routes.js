const express = require("express");
const userSchema = require("../models/user.model");

const userRoute = express.Router();

// get all users
userRoute.get("/", async (req, res) => {
	const users = await userSchema.find({});
	return res.json({ data: users });
});

// delete a user
userRoute.delete("/:id", async (req, res) => {
	const { id } = req.params;

	const user = await userSchema.deleteOne({ _id: id });

	return res.json({ status: true, user });
});

module.exports = userRoute;
