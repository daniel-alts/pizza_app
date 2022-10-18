
const passport = require('passport');

const UserModel = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt =require('jsonwebtoken')
require('dotenv').config()

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


const accessControl =(permission)=>{

        return async(req, res, next) =>{
            const user = await req.rawHeaders[1]
            const accessToken = await user.split(" ")[1]

            const user_payload = await jwt.verify(accessToken, process.env.JWT_SECRET)
            const {user_type} = user_payload.payload
            // console.log(user_type )

            if(permission.includes(user_type)){
                next()
            }else{
                return res.status(401).json({
                    success : false,
                    message: 'You do not have permission'
                })
            }
        }

        // return (req, res, next) => {
    // //    const user = UserModel.findOne({user: user.username});
    // const {username} = req.body

    //    if(permission.includes(username)){
    //     next()
    //    }else{
    //     return res.status(401).send({
    //         success: false,
    //         message: `You don't have permission`
    //     })
    //    }
       


    }

module.exports = {accessControl};