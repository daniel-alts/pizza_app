const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../model/userModel");
const localStrategy = require("passport-local").Strategy;
require("dotenv").config();

// extrating the Jwt from the query Params
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token"),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (token, next) => {
      try {
        return next(null, token);
      } catch (error) {
        next(error.message);
      }
    }
  )
);

// signUp middleware
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, next) => {
      try {
        const user = await UserModel.create({
          UserName: username,
          Password: password,
        });
        next(null, user);
      } catch (error) {
        next(error.message);
      }
    }
  )
);

// login middleware
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, next) => {
      try {
        const user = await UserModel.findOne({ UserName: username });
        if (!user)
          return next(null, false, {
            message: "User not found pls register...",
          });
        const validate = await user.isValidPassword(password);
        if (!validate)
          return next(null, false, { message: "Invalid User Password..." });
        return next(null, user, { message: "Logged in Successfully..." });
      } catch (error) {
        next(erorr.message);
      }
    }
  )
);
