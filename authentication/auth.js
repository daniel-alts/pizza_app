const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    new JWTstrategy (
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try{
                return done(null, token.user);
            } catch (error) {
                done(error);
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
        async (username, password, done) => {
            try {
                const user = await userModel.create({ username, password });
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
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ username });

                if (!user) {
                    return done(null, false, { message: 'user not found, pls signup if you do not have an account'});
                }

                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, { message: 'Wrong password, Pls input valid password'});
                }

                return done(null, user, { message: 'Login successful'})
            } catch (error) {
                return done(error)
            }
        }
    )
);