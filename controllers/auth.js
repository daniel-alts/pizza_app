const Users = require('../Models/userModels');
const router = require('express').Router();
const AppError = require('../utils/AppError');
const ResponseHandler = require('../utils/responseHandler');
const Catch_Async = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { findById } = require('../Models/userModels');
// global user variable
// !be careful
let user;

const SIGNTOKEN = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// !register
exports.Register = Catch_Async(async (req, res, next) => {
	const { username, password, email, role } = req.body;

	user = await Users.create({
		username: username,
		password: password,
		email: email,
	});

	const TOKEN = SIGNTOKEN(user._id);
	new ResponseHandler(res, user, 201);
});

// !login
exports.Login = Catch_Async(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password)
		return next(
			new AppError('Please Provide the right credentials', 400),
		);
	user = await Users.findOne({ email }).select('password');

	if (!user || !(await user.checkPassword(password, user.password))) {
		return next(new AppError('Login attempt failed', 400));
	}

	const TOKEN = await SIGNTOKEN(user._id);
	new ResponseHandler(res, user, 200, TOKEN);
});

exports.Auth = Catch_Async(async (req, res, next) => {
	let TOKEN;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		TOKEN = req.headers.authorization.split(' ')[1];
	}

	if (!TOKEN) {
		return next(new AppError('Login to get accees', 401));
	}

	const decodeToken = await promisify(jwt.verify)(
		TOKEN,
		process.env.JWT_SECRET,
	);

	// Confirm user.
	req.curUser = await Users.findById(decodeToken.id);
	next();
});

exports.Protect = Catch_Async(async (req, res) => {});
