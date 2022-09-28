const userModel = require('../models/userModel');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await userModel.find({});
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const addUser = async (req, res, next) => {
	const { body } = req;
	try {
		const newUser = await userModel.create(body);
		res.status(200).json(newUser);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllUsers,
	addUser,
};
