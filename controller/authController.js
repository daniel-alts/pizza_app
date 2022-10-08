const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function signup(req, res, next) {
    res.json({
        message: 'Signup successful',
        user: req.user
    })
}

async function login(req, res, next) {
    passport.authenticate('login', async function (e, user, info) {
        try {
            if (e) {
                return next(e)
            }
            if (!user) {
                const e = new Error('Invalid Username or Password')
                return next(e)
            }
            req.login(user, { session: false },
                async (e) => {
                    if (e) {
                        return next(e)
                    }
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
                    return res.json ({token})
                })
        } catch (e) {
            return next(e);
        }
    })(req, res, next)
}

module.exports = {
    signup,
    login
}