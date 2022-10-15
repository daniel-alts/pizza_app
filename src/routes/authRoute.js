const express = require('express');
const authRoute = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();





//Sign up route
authRoute.post('/register', passport.authenticate('register', { session: false }), async(req, res, next) => {
    // if (req.user.username == req.body.username) {
    //     return res.status(400).json({ message: "This username already exits." });
    // }
    return res.status(201).json( {
        message: "Thanks for registering.",
        user: req.user
    })
});



//Login route
authRoute.post('/login', async(req, res, next) => {
    passport.authenticate('login', async(err, user, info) => {
        try {
            if (err || !user) {
                const error = "Unable to login, try again."
                next(error);
            }
            req.login(
                user,
                {session: false},
                async(error) => {
                    if (error) {
                        next(error);
                    }
                    const body = { _id: user._id, username: user.username };
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
                    return res.json({ info, token });
                }
            )
        } catch(error) {
            next(error);
        }
    })(req, res, next);
})




module.exports = authRoute;