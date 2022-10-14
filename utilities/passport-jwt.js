const { authenticate } = require('passport');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userModel.create({
          username: req.body.username,
          email,
          password,
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const authenticateUser = async (email, password, done) => {
  try {
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return done(null, false, { message: 'User Not Found' });
    }

    const validate = await user.correctPassword(password, user.password);

    if (!validate) {
      return done(null, false, { message: 'Email or Password Incorrect' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
};

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    authenticateUser
  )
);
