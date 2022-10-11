const express = require('express');
const authController = require('../controllers/authController')
const passport = require("passport");


const authRouter = express.Router();

//get details of a particular user
// userRouter.get('/login', userController.login);
authRouter.post('/login', authController.login);


//signup
// userRouter.get('/signup', userController.signUp);
authRouter.post('/signup',  passport.authenticate('signup', { session: false }), authController.signup);

module.exports = authRouter