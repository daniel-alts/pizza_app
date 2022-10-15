const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('./models/userModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() 
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
    'signup',
    new localStrategy(
        {
            passReqToCallback: true,
            // usernameField: 'email',
            // passwordField: 'password'
        },
        async (req, username, password, done) => {
            try {
                const user = await userModel.create({ 
                    username, 
                    password, 
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    address: req.body.address,
                    user_type: req.body.user_type
                });

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
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });

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