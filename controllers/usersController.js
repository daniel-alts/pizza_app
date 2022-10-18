const moment = require("moment");
const userModel = require("../models/userModel");

// GET all users.............
async function getAllUsers(req, res) {
	const users = await userModel.find({});

	if (users.length < 1) {
		res.json({ status: false, users: null });
	} else {
		res.json({ status: true, users });
	}
}

// GET a single user by Id............
async function getUser(req, res) {
	const { userId } = req.params;
	const user = await userModel.findById(userId);

	if (!user) {
		return res.status(404).json({ status: false, user: null });
	}

	res.json({ status: true, user });
}

// POST a user...............
async function postUser(req, res) {
	const body = req.body;

	const user = await userModel.create({
		username: body.username,
		password: body.password,
		user_type: body.user_type,
		created_at: moment().toDate(),
		updated_at: moment().toDate(),
	});

	res.json({ status: true, user });
}

// UPDATE a user.
async function updateUser(req, res) {
	const { userId } = req.params;
	const { password } = req.body;

	const user = await userModel.findById(userId);

	if (!user) {
		res.json({ status: false, user: null });
	} else {
		user.password = password;
		user.save().then((user) => res.json({ status: true, user: user }));
	}
}

// DELETE a user...............
async function deleteUser(req, res) {
	const { userId } = req.params;

	await userModel.findByIdAndDelete(userId).then((user) => {
		res.json({ status: true, users: user });
	});
}

module.exports = {
	getAllUsers,
	getUser,
	postUser,
	updateUser,
	deleteUser,
};
