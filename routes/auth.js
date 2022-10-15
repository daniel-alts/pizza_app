const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');

const authrouter = express.Router();
require('dotenv').config();

authrouter.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }

            if (!user) return next(new Error('Username or Password is Incorrect'));

            req.login(user, { session: false }, async (err) => {
                if (err) return next(err);

                const body = { _id: user._id, email: user.email };

                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });

                return res.status(201).json({
                    token,
                });
            });
        } catch (err) {
            return next(err);
        }
    })(req, res, next);
});

authrouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    (req, res) => {
        res.redirect('/login');
    }
);

module.exports = authrouter;