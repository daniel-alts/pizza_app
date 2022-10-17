const passport = require('passport')
const localStrategy = require('passport-local')
const jwt = require('jsonwebtoken')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/userModel')
require('dotenv').config()


passport.use(
    'signup',
    new localStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passRequestToCallBack: true
        },
        async (req, username, password, done) => {
            try {
                const user = await User.create({username, password})
                
                return done(null, user)
            } catch (error) {
                console.log(error)
                // done(error)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField : 'username',
            passwordField : 'password'
        },
        async (username, password, done) => {
            try{
                const user = await User.findOne({username})
                
                if(!user) {
                    return done(null, false, {message: 'User not found'})
                }

                const validate = await User.isValidPassword(password)

                if(!validate){
                    return done(null, false, {message: 'Wrong password'})
                }

                return done(null, false, { message: 'Log in successful' })

            } catch{
                error => {
                    return done(error)
                }
            }
        }
    )
)

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try{
                return done(null, token.user)
            }catch(err){
                return done(err)
            }
        }
    )
)