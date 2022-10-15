/* eslint-disable no-undef */
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../auth');
// eslint-disable-next-line no-undef



const app = express.Router();

app.get("/", (req, res) => {
    res.render('index', {user: ""});
})

app.post('/login',  async (req, res, next) => {
        await passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                const error = new Error('Username or Password is Incorrect');
                return next(error);
            }
            req.login(user, {session: false}, 
                async (error) => {
                    if (error) return next(error);

                    const body = {_id: user._id, email: user.email};
                    const token = jwt.sign({user: body}, process.env.SECRET);
                    console.log(token)
                    return res.render('index', { user: user });
                }
            );
        } catch (error) {
            return next(error)
        }
    })(req, res, next);
})

app.get("/signup", (req, res) => {
    res.render('signup', {user: ""});
})

app.post("/signup", passport.authenticate('signup',{session: false}), async (req, res, next) => {
    req.user.password = undefined;
  res.json({ message: 'Signup Successful', user: req.user });
})

module.exports =  app;