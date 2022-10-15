const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = express.Router();

authRouter.post("/auth/sign-up", passport.authenticate("sign-up", { session: false }), async (req, res) => {
    res.json({
        message: "sign-up was successful",
        data: req.user
    })
})


authRouter.post("/auth/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user) => {
        
        try {
            if(err) {
                return next(err)
            }
            if(!user) {
                const error = new Error("Username or password is incorrect");
                return next(error)
            }
            req.login(user, { session: false },
                async(error) => {
                    if(error) return next (error);
                    const body = { _id: user._id, username: user.username };
                    const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
                    return res.json ({ token })
                }
                )
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}), 





module.exports =  authRouter;
