const { userModel } = require('../models/userModel')
const passport = require('passport')
const jwt = require('jsonwebtoken')

function signup(req, res) {
    return res.json({
        status: true, 
        message: "Signup successful, Login to make your orders",
        user: req.user
    })
}

async function login(req, res, next) {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) return next(err)

            if (!user) {
                const err = new Error(info.message)
                return next(err)
            }
            req.login(user, {session: false}, async(err) => {
                if (err) return next(err)

                const body = {_id: user._id, email: user._email}
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET)

                return res.json({
                    message: info.message,
                    token
                })
            })
        } catch(err) {
            next(err)
        }
    })(req, res, next)
   
}

module.exports = {
    signup,
    login
}