const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt

const UserModel = require("../models/user.js")

require("dotenv").config()

opts = {}
opts.secretOrKey = process.env.JWT_SECRET_KEY || 'secret'
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();


passport.use(
    new JwtStrategy(
        opts,
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
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
            try {
                const user = await UserModel.create({ username, password })
                return done(null, user);
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ username })

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await UserModel.isValidPassword(password)

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error)
            }
        }
    )
)