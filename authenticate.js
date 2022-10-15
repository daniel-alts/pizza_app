const express = require('express');

const {promisify} = require('util')
const jwt = require('jsonwebtoken')

const User = require('./userModel');

const app = express()

app.use(express.json());


//Authorisation Middleware <--First Assignment-->
/**
exports.authenticate =  async (req, res, next) => {
    const body = req.body
    if(!body){
        res.status(400).json({
            message: "No username or password provided"
        })
    return
    }
    const loginDetails = body
    const users = await userModel.find()
    const userFound = users.find((user) => {
        return user.username === loginDetails.username
    })

    if (!userFound){
        res.status(401).json({message:"User not found! Please sign up!"})
        return
    }    
    
    if (userFound.password !== loginDetails.password){
        res.status(401).json({message:"Invalid username or password!"})
        return
    }

    next();
};
*/


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup =  async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password})

    const token = signToken(newUser._id)

    res.status(200).json({
        status: 'success',
        token,
        data: {
            newUser
        }
    })
}

exports.login =  async (req, res, next) => {
    const {email, password} = req.body

    //check if email and password exist
    if (!email || !password) {
        res.status(400).json({
            message: "Please provide your email and password"
        })
       return 
    }
    //check if user exists and password is correct
    const user = await User.findOne({email}).select('+password')

    if(!user || !(await user.correctPassword(password, user.password))){
        res.status(401).json({
            message: "Incorrect email or Password"
        })
        return 
    }
    //if everything is ok, send token to client
    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.authorize =  async (req, res, next) => {
    //Get token and check if it exist
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        res.status(401).json({
            message: 'Please login to get access'
        })
        return 
    }

    //Validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    //check if users exist
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        res.status(401).json({
            message: 'This User does not exist'
        })
        return 
    }

    req.user = currentUser
    next()
}
