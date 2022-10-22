require('dotenv').config()
const passport = require('passport')
const passportjwt = require('passport-jwt')
const { generateJWT } = require('../utils')


const localStrategy = require('passport-local').Strategy
const JWTStrategy = passportjwt.Strategy
const ExtractJWT = passportjwt.ExtractJwt

passport.use(new JWTStrategy(
    {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            console.log(token);
            done(null, token);
        } catch (error) {
            done(null, error)
        }

    }
))

passport.use('login',
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    async (username, password, done) => {
        generateJWT(username, password)
            .then((token) => {
                return done(null, token)
            }).catch((error) => {
                return done(error)
            })        
    })
)