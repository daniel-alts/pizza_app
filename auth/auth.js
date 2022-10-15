const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const userModel = require('../model/userModel')
const JWTstrategy =  require('passport-jwt').Strategy;
const ExtractJWT =  require('passport-jwt').ExtractJwt;


passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async(token,done) =>{
            try{
                return done (null, token.user)
            }catch(error){
                done(error)
            }
        }
    )
)

//signing up the user

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) =>{
            try{
                const user = await userModel.create({username, password})
                return done(null,user)
            } catch(error){
                done(error)
            }
        }
    )
)

//login the user

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (email,password, done)=>{
            try{
                const user = await userModel.findOne({username})

                if (!user){
                    return done(null,false,{message: 'User not found'})
                }

                const validate = await user.isValidPassword(password)

                if (!validate){
                    return done(null, false, {message: 'Wrong Password'})
                }

                return done (null, user, {message: 'Logged in Successfully'})
            
            }catch(error){
                return done(error)
            }
        }
    )
)




