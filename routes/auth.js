const userControllers = require("../controllers/users");
const express = require("express");
const passport = require('passport')
const jwt = require('jsonwebtoken')

const authRouter = express.Router();
authRouter.post(
    '/auth/signup',
    passport.authenticate('signup', {session: false}),
    async (req, res) => {
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
            try {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    const error = new Error('Username or password is incorrect')
                    return next(error)
                }
                req.login(user, {session: false},
                    async (error) => {
                        if (error) return next();
                        const body = {_id: user._id, email: user.email};
                        const token = jwt.sign({user: body}, process.env.JWT_SECRET)
                        return res.json({token})
                    }
                    )
            } catch (error) {
                return next(error)
            }
        })
    }
)

module.exports = router
