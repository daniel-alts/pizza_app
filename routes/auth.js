const express = require("express");
const passport = require('passport')
const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel");

const authRouter = express.Router();
authRouter.post(
    '/auth/signup',
    passport.authenticate('signup', {session: false}),
    async (req, res) => {
        await userModel.create(req.user)
        return res.json({
            message: 'Signup successful',
            user: req.user
        })
    }
)

authRouter.post(
    '/auth/login',
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            console.log(user)
            try {
                console.log("2")
                if (err) {
                    return next(err)
                }
                if (!user) {
                    const error = new Error('Username or password is incorrect')
                    return next(error)
                }
                console.log("3")
                req.login(user, {session: false},
                    async (error) => {
                        if (error) return next();
                        const body = {_id: user._id, email: user.email};
                        const token = jwt.sign({user: body}, process.env.JWT_SECRET)
                        console.log("4")
                        return res.json({token})
                    }
                    )
            } catch (error) {
                return next(error)
            }
        })(req, res, next);
    }
)

module.exports = authRouter
