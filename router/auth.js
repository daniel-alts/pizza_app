const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const authRouter = express.Router()


authRouter.post(
    '/signup',
    passport.authenticate('signup', {session: false}), async(req,res)=>{
        res.json({
            message: 'Signup Successful',
            user: req.user
        })
    }
)

authRouter.post(
    '/login',
    async(req,res,next)=>{
        
        passport.authenticate('login', async(err,user, info)=>{
            try{
                if(err){
                    console.log(err, "errrrr")
                    return next(err)
                }
                if(!user){
                    const error  = new Error('Username or password is incorrect')  
                    return next(error)       
                }

                req.login(user,{session: false},
                    async(error)=>{
                        if(error) return next(error)
                        const body = {_id: user.id, username: user.username}

                        const token = jwt.sign({user:body}, process.env.JWT_SECRET)
                
                        return res.json({body,token})
                    }
                )
            }catch(error){
                return next(error)
            }
        })(req,res,next)
    }
)

module.exports = authRouter