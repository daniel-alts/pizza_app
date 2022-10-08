const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {userModel} = require('../models/userModel');
require('dotenv').config()
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
        },
        async (token, next) => {
            try {
                return next(null, token.user);
            } catch (e) {
                next(e);
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, next) => {
            try {
                const user = await userModel.create({ username, password });

                return next(null, user);
            } catch (e) {
                next(e);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, next) => {
            try {
                const user = await userModel.findOne({ username });

                if (!user) {
                    return next(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return next(null, false, { message: 'Wrong Password' });
                }

                return next(null, user, { message: 'Logged in Successfully' });
            } catch (e) {
                return next(e);
            }
        }
    )
);