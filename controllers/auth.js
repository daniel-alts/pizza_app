const Users = require('../Models/userModels');
const router = require('express').Router();
const AppError = require('../utils/AppError');
const ResponseHandler = require('../utils/responseHandler');

// global user variable
// !be careful

let user;

// register
exports.Register = async (req, res, next) => {
	try {
		user = await Users.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		new ResponseHandler(res, user, 201);
	} catch (error) {
		return next(new AppError(error.message, 404));
	}
};

exports.Login = async (req, res, next) => {
	try {
		user = await Users.findOne({
			username: req.body.username,
		});

		if (user.password !== req.body.password) {
			return next(new AppError(' Wrong Credentials', 403));
		}

		new ResponseHandler(res, user, 200);
	} catch (error) {
		return next(new AppError(error.message, 401));
	}
};
