const CONFIG = require('./config')
const Jwtstrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/userModel')
const localStrategy = require('passport-local').Strategy


const options = {}
options.secretOrKey = CONFIG.secret
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

module.exports = (passport) => {
    passport.use(
        new Jwtstrategy(options, async (userFtomToken, done) => {
            try {
                const user = await User.findById(userFromToken.id)
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            } catch (err){
                console.log(err)
            }
        })
    )
    


    // This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.
    passport.use(
        'signup',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
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

// This middleware authenticates the user based on the email and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.
    passport.use(
        'login',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const user = await UserModel.findOne({ email });

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

}
