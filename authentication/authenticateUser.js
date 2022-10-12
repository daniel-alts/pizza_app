const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy( 
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
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

// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.
passport.use(
    'signup',
    new localStrategy(
        {
            firstnameField: 'firstname',
            lastnameField: 'lastname',
            genderField: 'gender',
            usernameField: 'username',
            passwordField: 'password'
        },
        async (firstname, lastname, gender, username, password, done) => {
            try {
                const user = await userModel.create({ firstname, lastname, gender, username, password });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// This middleware authenticates the user based on the username and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.
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
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);