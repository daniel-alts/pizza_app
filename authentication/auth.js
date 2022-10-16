const passport = require('passport');
const userModel = require('../models/userModel');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJWT.fromHeader('token'),
		},
		async (token, done) => {
			console.log(token);
			try {
				return done(null, token.user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	'signup',
	new localStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			try {
				const { first_name, user_type } = req.body;
				const user = await userModel.create({ password, username, first_name, user_type });
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
		},
		async (username, password, done) => {
			try {
				const user = await userModel.findOne({ username });

				if (!user) {
					return done(null, false, {
						message: 'User not found',
					});
				}
				const validate = user.isValidPassword(password);
				if (!validate) {
					return done(null, false, {
						message: 'Wrong password or username',
					});
				}
				return done(null, user, {
					message: 'Login successful',
				});
			} catch (error) {
				done(error);
			}
		}
	)
);
