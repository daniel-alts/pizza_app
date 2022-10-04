const userModel = require("../models/userModel");

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
		//  const match = await bcrypt.compare(
		// 		passWord,
		// 		user.passWord
		// 	);
		if (user && passWord === user.passWord) {
			req.userAuthenticated = {
				userName: user.userName,
				role: user.userType,
			};
		} else {
			return res
				.status(422)
				.json("Username/Password incorrect");
		}
		next();
	} catch (err) {
		console.log(err);
		return res.status(500).send("Server Error");
	}
}

module.exports = {
	authenticateUser,
};
