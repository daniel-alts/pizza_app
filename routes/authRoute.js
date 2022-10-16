const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRoute = express.Router();

authRoute.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
	res.status(200).json({
		message: 'Signup successful',
		user: req.user,
	});
});

authRoute.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err) {
				return next(err);
			}
			if (!user) {
				const error = new Error('Username or password incorrect');
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);
				const body = { id: user.id, username: user.username };
				const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

				return res.json({ token });
			});
		} catch (error) {
			next(error);
		}
	})(req, res, next);
});

module.exports = authRoute;
