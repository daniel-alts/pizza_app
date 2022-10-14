const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
async function authenticateUser(req, res, next) {
	const authorization = req.headers.authorization;

	try {
		const encoded = authorization.substring(6);

		// decode to get username and password as plain text
		const decoded = Buffer.from(
			encoded,
			"base64"
		).toString("ascii");

		const [userName, passWord] =
			decoded.split(":");

		const user = await userModel.findOne({
			userName,
		});

		const match = await bcrypt.compare(
			passWord,
			user.passWord
		);

		if (match) {
			req.userAuthenticated = {
				userName: user.userName,
				role: user.userType,
				passWord: user.passWord,
			};
		} else {
			return res
				.status(422)
				.json("Password incorrect");
		}
		next();
	} catch (err) {
		return res.status(404).send("INVALID USER");
	}
}

module.exports = {
	authenticateUser,
};
