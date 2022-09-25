const Users = require('../Models/userModels');
const router = require('express').Router();

// global user variable
// !be careful

let user;

// register
exports.Register = async (req, res) => {
	user = await Users.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});

	res.status(201).json({
		status: 'success',
		data: user,
	});
};
