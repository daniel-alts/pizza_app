const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Use this if you are using Bearer token
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
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true, //Allows the req parameter to be passed into the function
    },
    async (req, username, password, done) => {
      try {
        const email = req.body.email;
        const phone_number = req.body.phone_number;
        const user_type = req.body.user_type;
        const user = await User.create({
          username,
          password,
          email,
          phone_number,
          user_type,
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
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "User not found, signup" });
      }
      const validate = await user.isValidPassword(password);
      if (!validate) {
        return done(null, false, {
          message: "Wrong Password, try forget password",
        });
      }
      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  })
);
