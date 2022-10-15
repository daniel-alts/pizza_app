const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require ('dotenv').config()

// define an auth route here for both users and orders
// that is, authentication of both routes depends on the suceess of the signup and login routes

const authRoute = express.Router()

// route for signup
authRoute.post(
    '/signup',

    passport.authenticate('signup', {session: false}), 
    async(req, res, next)=>{
        res.status(200).json({
            message: 'SignUp successful',
            user: req.user

        })
    }
)

// route for login

authRoute.post(
    '/login',
    async (req, res, next)=>{
        passport.authenticate('login', async(err, user, info)=>{
            try{
                if(err){
                    return next(err);
                }
                if (!user) {
                    const error = new Error('Username or password is incorrect');
                    return next(error);
                }
                
                req.login(user, { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, email: user.email };
                        //store the id and email in the payload of the JWT. 
                        // then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                        // DO NOT STORE PASSWORDS IN THE JWT!
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                        return res.json({ token });
                    }
                );
            }catch(error){
                return next(error)
            }
        }
        )(req, res, next)
    }
)

module.exports = authRoute