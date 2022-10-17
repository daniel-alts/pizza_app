const express= require('express')
const passport = require("passport")
const UserModel = require("./models/UserModel")
const { LocalStrategy} = require('passport-local')
const authenticate = async (req, res, next)=>{
  res.status(200)
  // const authheader = req.headers.authorization

  //
  // if(!authheader){
  //   const err = new Error("You are not authenticated!")
  //   res.setHeader('WWW-Authenticate', 'Basic')
  //
  //   res.status(401).send("User not authenticated")
  //   return next(err)
  // }
  //
  // const auth = new Buffer.from(authheader.split(' ')[1],
  // 'base64').toString().split(":")
  // const name = auth[0]
  // const password = auth[1]
  //
  // if(name ==="admin" && password==="password"){
  //   next()
  // }else{
  //   const err = new Error('You are not authenticated!')
  //   res.setHeader('WWW-Authenticate', 'Basic')
  //   res.status(401).send("User not authenticated")
  //   return next(err)
  //
}


module.exports = authenticate
