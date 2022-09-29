const Users = require('../Models/userModels');
const router = require('express').Router();
const AppError = require('../utils/AppError');
const ResponseHandler = require('../utils/responseHandler');
const Catch_Async = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');

// global user variable
// !be careful
let user;

// register
exports.Register = Catch_Async(async (req, res, next) => {
	const { username, password, passwordConfirm } = req.body;

	user = await Users.create({
		username: username,
		password: password,
	});

	new ResponseHandler(res, user, 201);
});

exports.Login = catchAsync(async (req, res, next) => {
	user = await Users.findOne({
		username: req.body.username,
	});

	if (user.password !== req.body.password) {
		return next(new AppError(' Wrong Credentials', 403));
	}

	new ResponseHandler(res, user, 200);
});
