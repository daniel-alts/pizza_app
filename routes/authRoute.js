const { login, signup } = require('../controller/authController');
const passport = require('passport')
const express = require('express')
const authRoute = express.Router();

authRoute.post('/signup', passport.authenticate('signup', { session: false }), signup)

authRoute.post('/login', login)

module.exports = authRoute;