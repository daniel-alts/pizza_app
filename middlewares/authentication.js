const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const authenticateUser = (req, res, next) => {
	return new Promise(async (resolve, reject) => {
		const { username, password } = req.body;
		const user = await userModel.findOne({ username });
		if (!user) {
			reject("You must provide a username and password.");
		} else {
			if (username === user.username && password === user.password) {
				resolve("Authenticated successfully.");
			} else {
				reject("Incorrect username or password.");
			}
		}
	});
};

module.exports = { authenticateUser };
