const passport = require('passport');
const moment = require('moment');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users.model');
require('dotenv').config();

/**
 * This middleware saves the information provided by the
 * user to the database, and then sends the user information
 * to the next middleware if successful. Otherwise, it
 * reports an error.
 */
passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { name } = req.body;
      try {
        const user = await UserModel.create({
          name,
          username,
          password,
          createdAt: moment().toDate(),
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

/**
 * This middleware authenticates the user based on the email
 * and password provided. If the user is found, it sends the
 * user information to the next middleware.
 * Otherwise, it reports an error.
 */
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({
          username,
        });

        if (!user) {
          return done(null, false, {
            message: 'User not found',
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: 'Wrong Password',
          });
        }

        return done(null, user, {
          message: 'Logged in Successfully',
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// Verify JWT Tokens
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
    },
  ),
);
