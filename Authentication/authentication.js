const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel')
require('dotenv').config()

const JWTstrategy = require ('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret-token')
        },
        async (token, done) => {
            try{
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy (
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async(username, password, done) => {
            try {
                const user = await UserModel.create({username, password});
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);


passport.use(
    'login',
    new localStrategy (
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({username});
                
                if (!user) {
                    const userDoesNotExist = new Error("User not found")
                    return done(userDoesNotExist, true, {message: 'User not found'});
                }
                
                const validate = await user.isValidPassword(password);
                console.log("Validated: ", validate)
                
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
                
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )

)

