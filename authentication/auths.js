const passport = require("passport");
const localStrategy =
	require("passport-local").Strategy;
const User = require("../models/userModel");
const JWTstrategy =
	require("passport-jwt").Strategy;
const ExtractJWT =
	require("passport-jwt").ExtractJwt;
require("dotenv").config();

passport.use(
	"signup",
	new localStrategy(
		{
			usernameField: "userName",
			passwordField: "passWord",
			//ALLOWS REW PARAMS TO BE PASSED
			passReqToCallback: true,
		},
		async (req, userName, passWord, done) => {
			try {
				const userType = req.body.userType;
				const userObject = { userName, passWord };
				if (userType)
					userObject.userType = userType;
				const user = await User.create({
					userObject,
				});
				console.log(userObject);

				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);
// ...

passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "userName",
			passwordField: "passWord",
		},
		async (userName, passWord, done) => {
			try {
				const user = await User.findOne({
					userName,
				});

				if (!user) {
					return done(null, false, {
						message: "User not found",
					});
				}

				const validate =
					await user.isValidPassword(passWord);
				// 	(await user.passWord) === passWord
				// 		? true
				// 		: false;
				// console.log(validate);

				if (!validate) {
					return done(null, false, {
						message: "Wrong Password",
					});
				}

				return done(null, user, {
					message: "Logged in Successfully",
				});
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest:
				ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (token, done) => {
			console.log(token);
			try {
				const user = await User.findById(
					token.id
				);
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			} catch (e) {
				console.log(e);
			}
		}
	)
);
