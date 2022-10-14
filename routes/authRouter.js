const express = require("express");
const passport = require("passport");
require("../middlewares/jwt_auth");

const authRouter = express.Router();

// Signup user
authRouter.post("/signup", passport.authenticate("signup", {session: false}), async(req, res) => {
    res.json({
        message: "Signup successful",
        user: req.user.user,
        token: req.user.token
    })
})

// Signin user
authRouter.post("/signin", passport.authenticate("signin", {session: false}), async(req, res) => {
    res.json({
        message: "Signin successful",
        user: req.user.user,
        token: req.user.token
    })
})

module.exports = authRouter;