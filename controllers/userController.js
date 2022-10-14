const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
	const { userName, passWord, userType } =
		req.body;
	const hashedPassword = await bcrypt.hash(
		passWord,
		10
	);

	try {
		const user = await User.create({
			userName,
			passWord: hashedPassword,
			userType,
		});
		if (user) res.status(201);
		res.json({ "user created": true, user });
		return;
		if (!user) res.status(400);

		return;
	} catch (er) {
		res.status(400);
		res.json({ user: false });
		return;
	}
};

const getUsers = async (req, res, next) => {
	const users = await User.find({});

	res.status(200);
	res.json({ users });
	return;
};

// const deleteUser = async (req, res, next) => {
// 	const id = req.params.id;

// 	const { role } = req.userAuthenticated;

// 	if (role === "admin") {
// 		await User.deleteOne({
// 			_id: id,
// 		})
// 			.then((user) => {
// 				if (user.deletedCount) {
// 					res.json({
// 						status: true,
// 						user: user,
// 					});
// 				} else {
// 					res.status(404).json("User not found");
// 				}
// 			})
// 			.catch((err) => {
// 				next();
// 			});
// 	} else {
// 		res.status(404).json("Unauthorized action");
// 	}
// 	next();
// };

module.exports = {
	createUser,
	// deleteUser,
	getUsers,
};
