const passport = require('passport')
const User = require('../model/userModel')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()

passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
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
    'login',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },async(username,password,done)=>{
        try {
                const user = await User.findOne({username}) 
                if(!user){
                    return done(null,false, { message: "you are not registered yet go to /user/signup and create an account"})
                }
                const comparePass = await user.comparePassword(password)
                
                if(!comparePass){
                    return done(null, false, {message: "your Password is incorrect"})
                }
                return done(null , user, { message:'Logged in successfully'})
            } catch (error) {
               return done(error)
            }
    }
)
)