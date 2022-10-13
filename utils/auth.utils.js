const passport = require("passport");
const userSchema = require("../models/user.model");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	"register",
	new localStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				const user = await userSchema.create({
					username,
					password,
					// user_type: user_type ? user_type : void 0,
				});

				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				const user = await userSchema.findOne({ username: username });

				if (!user) {
					return done(null, false, { message: "User not found" });
				}

				const validate = await user.isValidPassword(password);

				if (!validate) {
					return done(null, false, { message: "Wrong Password" });
				}

				return done(null, user, { message: "Logged in Successfully" });
			} catch (error) {
				return done(error);
			}
		}
	)
);

// const bcrypt = require("bcrypt");
// const userSchema = require("../models/user.model");

// async function authenticateUser(req, res, next) {
// 	const authHeader = req.headers.authorization;

// 	if (!authHeader) {
// 		return res
// 			.setHeader("WWW-Authenticate", "Basic")
// 			.status(401)
// 			.send("You are not authenticated!");
// 	}

// 	const auth = new Buffer.from(authHeader.split(" ")[1], "base64")
// 		.toString()
// 		.split(":");
// 	const username = auth[0];
// 	const password = auth[1];

// 	// check if user exists in database
// 	const user = await userSchema.findOne({username: username});

//   if (!user) {
//     return res
//     .setHeader("WWW-Authenticate", "Basic")
//     .status(401)
//     .send("Authentication failed: wrong username or password");
//   }

// 	const isMatch = await bcrypt.compare(password, user.password);

// 	if (isMatch == true) {
//     res.locals.user = user;
// 		console.log(`user ${username} authenticated!`);
// 		next();
// 	} else {
// 		return res
// 			.setHeader("WWW-Authenticate", "Basic")
// 			.status(401)
// 			.send("Authentication failed: wrong username or password");
// 	}
// }

// function authorize(roles = []) {

// 	return [
// 		(req, res, next) => {
// 			if (roles.length && !roles.includes(res.locals.user.user_type)) {
// 				// user's role is not authorized
// 				return res
// 					.status(401)
// 					.send("You are not authorized to access this resource");
// 			}

// 			// authentication and authorization successful
// 			next();
// 		},
// 	];
// }

// module.exports = { authenticateUser, authorize };
