const express= require('express')
const bauth = require("basic-auth")
const UserModel = require("./UserModel")

const auth= async (req, res, next)=>{
  const authheader = req.header.authorization
  console.log(authheader)


  // if(!authheader){
  //   const err = res.status(401).json({
  //     message: "You are not authorized"
  //   })
  //   // res.setHeader('WWW-Authenticate', "Basic")
  //   res.status(401).send("User not authenticated")
  //   next(err)
  // }

  // const auth = new Buffer.from(authheader.split(' ')[1].toString().split("1"))
  // const name = auth[0]
  // const password = auth[1]
  // const authuser = await UserModel.findOne({ username: name})

  // if(!authuser){
  //   const err = res.status(401).json({
  //     message: "input details"
  //   })
  //   return next(err)
  // }else{
  //   const err = res.status(401).json({
  //     message: "You are not authorised"
      
  //   })
  //   next(err)
  // }
  
  next()
}


module.exports = auth
