const express = require('express')

const UserModel = require('../models/userModel')
const passport = require('passport');
const  jwt = require('jsonwebtoken');
const { application } = require('express');
const { hashSync, compareSync } = require('bcrypt')

require('dotenv').config();

const userAuth_Router = express.Router();


//REGISTRATION ROUTE
userAuth_Router.post('/register', (req, res, next)  =>{
       const user = new UserModel({
           username: req.body.username,
           password:  hashSync(req.body.password, 10),
           user_type: req.body.user_type
        })
        // console.log(user)

        user.save().then(user =>{

            res.send({
                success: true,
                message : 'user created successfully',
                user: {
                    id : user._id,
                    username : user.username,
                    user_type : user.user_type
                }
            })
        }).catch(error =>{
           next(error)
        })
    }
)

//SIGN IN ROUTE
userAuth_Router.post('/login', (req, res) =>{
    const {username, password} = req.body

    const user = UserModel.findOne({username 
    }).then(user => {

        //no user found
        if(!user){
            return res.status(401).send({
                success : false,
                message : 'user not found'
            })
        }

        //incorrect password
        if(!compareSync(password, user.password)){
            return res.status(401).send({
                success : false,
                message : "Incorrect password"
            })
        }
        //correct information
        const payload ={
            _id : user.id,
            username : user.username,
            user_type : user.user_type,
        }

        const token = jwt.sign({payload}, process.env.JWT_SECRET,{ expiresIn : "2d"})
        return res.status(200).send({
            success : true,
            messsage : 'logged in successfully',
            token : "Bearer " + token
        })
    })

})






module.exports = userAuth_Router;