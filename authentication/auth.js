// where we retrieve token for signup and login using passport

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UsersModel = require('../models/usersModel')

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt // to extract token from a request

// this checks if any request coming to the server has a jwt that contains the secret_token(can be anyname as defined in the function) defined
// then, it uses the JWT_SECRET to decrypt the secret_token to get all details, if correct it carries out the next command OR
// if you are using the bearer auth method which is the standard method, extractajwt from header as a bearer token. secret_token is not used here

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        }, 
        async(token, next)=>{
            try{
                return next(null, token.user)
            } catch(error){
                return next(error)
            }
        }
    )
)

// this next middleware saves the information provided to the DB,
// then, it sends the users information to the next middleware if successful or returns an error if it fails

// for signup
passport.use(
    'signup',
    new localStrategy(
        {// how can i use email or username for the same usernamefield?
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, next)=>{
            try{
                const user = await UsersModel.create({email, password})
                return next(null, user, {message: "Sign In successful"})
            } catch(error){
                next(error)
            }
        }
    )
)

// we use this to authenticate the user based on the information passed,
// if the user is found and authenticated, it is passed to the next middleware,
// if otherwise, it throws an error

// for login
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        }, 
        async(email, password, next)=>{
            try{
                const user = await UsersModel.findOne({email})

                if(!user){
                    return next( null, false, {message: 'email and password not found'})
                }

                const validatePassword = await user.$isValidPassword(password)

                if(!validatePassword){
                    return next(null, false, {message: 'password is incorrect!'})
                }

                return next(null, user, {message: 'Login Successful'})

            } catch(error){
                next(error)
            }
        }
    )
)









