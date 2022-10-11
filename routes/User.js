const express = require("express")
const userModel = require("../models/userModel")
const passport = require("passport")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userRoute = express.Router()
// register admin

userRoute.post("/signup", passport.authenticate("signup",{session: false}),async(req,res,next)=>{
    res.status(200).json({
        message: "signup successful",
        user: req.user
    })
    
})

userRoute.post("/login",async (req, res, next)=>{
    passport.authenticate("login",async(err,user,info)=>{
        
        try{
            if(err){
                return next(err)
            }
            if (!user){
                const error = new Error ("Username or password incorrect")
                return next(error)
            }
            req.login(user,{session: false},async(err)=>{
                if(err){
                    return next(err)
                }
    
                const body = {
                    _id: user._id,
                    username: user.username
                }

                const token = jwt.sign({user: body},process.env.SECRET_KEY)

                return res.json({token})
    
            })
        }catch(err){
            next(err)
        }
       
    })(req,res,next)
})

userRoute.get('/', async (req, res) => {
    const allUsers = await userModel.find()

    return res.status(200).json({ status: true, allUsers })
})



module.exports = userRoute