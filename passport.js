const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('./models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET || 'something_secret',
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try{
                return done(null, token.user);
            }
            catch(error){
                done(error);
            }
        }
    )
)

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try{
                const user = await userModel.create({ username, password });

                return done(null, user, { message: 'User created successfully' });
            }
            catch(error){
                console.log(error)
                done(error);
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try{
                const user = await userModel.findOne({ username });

                if(!user){
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            }
            catch(error){
                return done(error);
            }
        }
    )
);