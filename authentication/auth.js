const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { userModel } = require('../models/userModel')

require('dotenv').config()

passport.use(
    'jwt',
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },

        async(token, done) => {
            try {
                return done(null, token.user)
            } catch(err) {
                done(err)
            }
        }
    )
)
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
    
        async function (req, email, password, done) {
            try {
                const countUsers = await userModel.count({})
                
                const userInfo = req.body
                console.log(userInfo)
                if (countUsers == 0) userInfo._id = 1
                else userInfo._id = countUsers + 1

                const {_id, username, user_type} = userInfo

                const user = await userModel.create({_id, username, user_type, email, password})

                return done(null, user)
            } catch(err) {
                done(err)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            "usernameField": "email",
            "passwordField": "password",
            "passReqToCallback": true
        },

        async function(req, email, password, done) {
            try {
                const user = await userModel.findOne({email})

                if (!user) return done(null, false, {message: "User not found"})

                const validate = await user.isValidPassword(password)

                if (!validate) return done(null, false, {message: "Password incorrect"})

                return done(null, user, {message: "user logged in successfully"})
            } catch(err) {
                return done(err)
            }
        }
    )
)