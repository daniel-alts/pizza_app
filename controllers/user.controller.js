const bcrypt = require("bcrypt");
const userSchema = require("../models/user.model");

async function createUser(req, res) {
	const { username, password } = req.body;
	const hashedPwd = await bcrypt.hash(password, 10);

	const user = await userSchema.create({ username, password: hashedPwd });

	await user.save();

	return res.status(201).send(user);
}

async function loginUser(req, res) {
	const { username, password } = req.body;

	const user = await userSchema.findOne({ username });
	const isMatch = await bcrypt.compare(password, user.password);

	if (isMatch == true) {
		console.log("logged in!");
		req.session.user = user;
		return res.send(user);
	} else {
		return res.status(401).send("wrong ID or password");
	}
}

async function logoutUser(req, res) {
	req.session.user = null;
	return res.send("logged out");
}

async function getAllUsers(req, res) {
	const users = await userSchema.find({});
	return res.json({ data: users });
}

module.exports = { createUser, loginUser, logoutUser, getAllUsers };
