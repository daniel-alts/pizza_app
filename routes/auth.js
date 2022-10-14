const express = require('express')
const authRoute = express.Router()
const passport = require('passport')

authRoute.post("/login", passport.authenticate("login", {session: false}), async(req, res) => {
    res.json({
        message: "successfully logged in",
        user: req.user.user,
        token: req.user.token
    })
})

authRoute.post("/signup", passport.authenticate("signup", {session: false}), async(req, res) => {
    res.json({
        message: "Sign up successful",
        user: req.user.user,
        token: req.user.token
    })

})

module.exports = authRoute