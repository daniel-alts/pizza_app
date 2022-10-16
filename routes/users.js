const express = require('express');
const userController = require('../controllers/register')
require('../authentication/auth') // Signup and login authentication middleware

const passport = require('passport')

const userRouter = express.Router();

userRouter.route('/register').post(passport.authenticate('register', { session: false }), userController.registerUser)

       


module.exports = userRouter;