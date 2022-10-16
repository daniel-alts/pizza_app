const moment = require("moment");
const express = require("express");
const passport = require("passport")
const jwt = require("jsonwebtoken")
require('dotenv').config
const userModel = require("../models/userModel");
const authenticateDetails = require('../basicAuthentication')

const userRouter = express.Router()



   
userRouter.post('/signup',passport.authenticate('signup',{session:false}), async (req,res,next)=>{
  res.json({message:"Account created successfully",
             user: req.user
})
}
)

userRouter.post('/login', async (req,res,next)=>{
passport.authenticate('login',
 async(err, user,info)=>{
try{
if(err){
  return next(err)
}
if(!user){
const error= new Error("Username or password incorrect")
return next(error)

}

req.login(user, {session:false}, async(error)=>{
if(err){
return next(err)}
const body= {_id: user.id, username: user.username }

const token = jwt.sign({user:body}, process.env.JWT_SECRET, {expiresIn:'1hr'})

return res.json({token})
})

}

catch(error){
  return next(error)
}


 })

(req,res,next)


})

   
   module.exports=userRouter