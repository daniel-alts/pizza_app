const userSchema = require("./models/userModel");

// function authenticateUser(req, res, roles) {
// 	return new Promise(async (resolve, reject) => {
// 		// get user details
// 		const userDetails = req.body.user;

// 		// check if user details were provided
// 		if (!userDetails) {
// 			reject("Please enter your username and password");
// 		}

// 		// validate username and password
// 		const user = await userSchema.findOne({
// 			username: userDetails.username,
// 			password: userDetails.password,
// 		});

// 		if (!user) {
// 			reject("Invalid username or password");
// 		}

// 		user.select("user_type");

// 		user.exec((error, user) => {
// 			if (error) {
// 				reject(error);
// 			}

// 			// validate access level
// 			if (!roles.includes(user.user_type)) {
// 				reject("You do not have the required role to access this resource");
// 			}

// 			resolve(user);
// 		});
// 	});
// }

async function authenticateUser(req, res, roles) {
	try {
		// get user details
		const userDetails = req.body.user;

		// check if user details were provided
		if (!userDetails) {
			return res
				.status(401)
				.json({ message: "Please enter your username and password" });
		}

		// validate username and password
		const user = await userSchema
			.findOne({
				username: userDetails.username,
				password: userDetails.password,
			})
			.exec();

		// console.log(user);

		if (!user) {
			// throw new Error("Invalid username or password");
			return res
				.status(401)
				.json({ message: "from auth.js, Invalid username or password" });
		}

		// validate access level
		if (!roles.includes(user.user_type)) {
			return res.status(401).json({
				message: "You do not have the required role to access this resource",
			});
		}

		// user.select("user_type");

		// user.exec((error, user) => {
		// 	if (error) {
		// 		return res.json({ message: error });
		// 	}

		// 	// validate access level
		// 	if (!roles.includes(user.user_type)) {
		// 		return res.status(401).json({
		// 			message: "You do not have the required role to access this resource",
		// 		});
		// 	}

		// });

		return user;
	} catch (error) {
		// return res.status(500).json({ message: error.message });
		console.log(error);
	}
}

module.exports = { authenticateUser };
