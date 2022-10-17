const passport = require('passport');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/userModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// const {ExtractJwt, Strategy} = require('passport-jwt')
const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const JWT_STRING = process.env.JWT_SECRET;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: JWT_STRING,
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('my_token'),
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: 'User not found' });
        }
        return done(null, user, { message: 'Login Successful' });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport.use('login', async (req, res, next) => {
//   passport.authenticate('login', async (err, user, info) => {
//     try {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         const error = new Error('User detail is incorrect');
//         return next(error);
//       }
//       req.login(user, { session: false }, async (err) => {
//         if (err) return next(err);
//         const body = { _id: user._id, email: user.email };
//         const token = jwt.sign({ user: body }, JWT_STRING);
//         return res.json({ token });
//       });
//     } catch (err) {
//       return next(err);
//     }
//   })(req, res, next);
// });

const basicAuthentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(403)
      .json({ status: 'access denied', msg: "You're yet to be authenticated" });
    return;
  }
  next();
};

module.exports = { basicAuthentication };
