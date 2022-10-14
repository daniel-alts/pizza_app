const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../Models/users');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
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
            username: 'name',
            password: 'password',
            user_type: 'enum [admin, general]'
        },
        async (username, password, user_type, done) => {
            try {
                const user = await UserModel.create({ username, password, user_type : 'enum [admin, general]' });

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
            username: 'name',
            password: 'password',
            user_type: 'enum [admin, general]'
        },
        async (name, password,  done) => {
            try {
                const user = await UserModel.findOne({ name });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                const user_type = await UserModel.findOne({ user_type})

                if (!user_type) {
                    return done(null, false, { message: 'User not authorized' }); 
                }


                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

// i created an authenticate file to determine the type of user loggin in