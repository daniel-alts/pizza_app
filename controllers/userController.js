const userModel = require("../models/userModel");

const createUser = async (req, res) => {
	const { userName, passWord, userType } =
		req.body;

	// const users
	await userModel
		.create({ userName, passWord, userType })
		.then((user) =>
			res
				.status(201)
				.json({ "user created": true, user })
		)
		.catch((err) => console.log(err));
};

const getUsers = async (req, res, next) => {
	const users = await userModel.find({});

	res.status(200);
	res.json({ users });
};

const deleteUser = async (req, res, next) => {
	const id = req.params.id;

	const { role } = req.userAuthenticated;

	if (role === "admin") {
		await userModel
			.deleteOne({
				_id: id,
			})
			.then((user) => {
				if (user.deletedCount) {
					res.json({
						status: true,
						user: user,
					});
				} else {
					res.status(404).json("User not found");
				}
			})
			.catch((err) => {
				next();
			});
	} else {
		res.status(404).json("Unauthorized action");
	}
	next();
};

module.exports = {
	createUser,
	deleteUser,
	getUsers,
};
