const passport = require("passport");
const UserModel = require("./models/userModel");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false);
        }
        const validate = await user.verifyPassword(password);
        console.log(validate);
        if (!validate) {
          return done(null, false, { message: "wrong password" });
        }
        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(err);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
