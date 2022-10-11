const userModel = require("./models/userModel")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const jwtStrategy = require("passport-jwt").Strategy
require("dotenv").config()


passport.use(
    new jwtStrategy(
        {
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },async(token,done)=>{
            try{
                return done(null,token.user)
            }catch(err){
                done(err)
            }

        }
    )
)

passport.use("signup",
new localStrategy(
    async(username, password, done)=>{
        try{
            const user = await userModel.create({username,password})
            console.log(user)
            return done(null,user)
        }
        catch(error){
            done(error)
        } 
    }
))

passport.use("login",
new localStrategy(
    async (username,password,done)=>{
        try{
            const user = await userModel.findOne({username})
            if(!user){
                return done(null,false,{message:"Username not found "})
            }
            const validate = await user.isValidPassword(password)
            if(!validate){
                return done(null, false, {message: "incorect password "})

            }

            return done(null, user, {message :"Logged i successfuly"})
            
        }catch(error){
            done(error)
        }
    }

))