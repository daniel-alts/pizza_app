const userModel = require('../models/userModel');
const moment = require('moment');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
	const body = req.body;
	body.createdAt = moment().toDate();

	try {
		const user = await userModel.create(body);
		res.status(201).json({ message: 'Signup successful', user });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(500).json({
				status: false,
				error: `username ${body.username} is taken already `,
			});
		}

		let newMessage = Object.values(error.errors)
			.map((element) => element.message)
			.join(' , ');
		if (newMessage) {
			return res.status(500).json({ status: false, message: newMessage });
		}
		return res.status(500).json({ status: false, error });
	}
};

const loginUser = async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err) return next(err);
			if (!user) {
				const error = new Error('Username or password is incorrect');
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, username: user.username };
				//You store the id and email in the payload of the JWT.
				// You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
				// DO NOT STORE PASSWORDS IN THE JWT!
				const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

				return res.json({ user: user.username, token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};

module.exports = { registerUser, loginUser };
