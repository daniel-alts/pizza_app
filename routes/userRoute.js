var express = require('express');
var userRouter = express.Router();
const bodyParser = require("body-parser")
var User = require("../models/userSchema")

var authenticate = require('../authenticate');

userRouter.use(bodyParser.json())



userRouter.post("/signup", (req, res, next)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
    if(user != null){
        return res.status(403).json({status:false, message: 'User already exist'})
    }
    else{
        return User.create({
            username: req.body.username,
            password: req.body.password
        })
    }
    
  })
  .then((user)=>{
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({status:true, message:'Registration Successful', user: user})
  })
  .catch((err)=>{
    res.status(400).json({error:err})
  })
});

userRouter.post("/login", (req, res)=>{
    var authenticateHeader = req.headers.authorization
    if(!authenticateHeader){
        return res.status(404).json({ status: false, message: 'Please provide username and password in the Authorization header' })
    }
    var auth = new Buffer.from(authenticateHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1]
    if (username == 'admin' && password == 'password'){
        return next()
    }
    else{
        return res.status(403).json({ status: false, message: 'You are an unauthorized user' })  
    }
})



module.exports = userRouter;