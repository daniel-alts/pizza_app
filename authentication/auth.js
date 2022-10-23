const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt

const userModel = require("../model/userModel")

passport.use(
    new JWTstrategy(
        {
            secretOrKey : process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret-token')
        },
        async(token, done)=>{
            try{
                return done(null, token.user)
            }catch(error){
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
        async (username, password, done)=>{
            try {
                const user = await userModel.create({username, password})
                return done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

// This middleware authenticates the user based on the email and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async(username, password, done)=>{
            try{
                const user = await userModel.findOne({username})
                if(!user){
                    return done(null, false, {message: 'User not found'})
                }
                const validate = await user.isValidPassword(password)

                if(!validate){
                    return done(null, false, {message: 'Wrong password entered'})
                }

                return done(null,user, {message: 'logged in successfully'})
            }catch(error){
                return done(error)
            }
        }
    )
)