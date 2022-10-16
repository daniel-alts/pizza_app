const express = require('express')
const Router = express.Router
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()

const authRouter = new Router()

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        })
    }
)

authRouter.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    const error = new Error('Username or password is incorrect');
                    return next(error);
                }

                req.login(user, { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, username: user.password };
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY);

                        return res.json({ token });
                    })
            } catch (error) {
                return next(error);
            }
        })(req, res, next)
    }
)

module.exports = authRouter