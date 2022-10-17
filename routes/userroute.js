const express = require('express');

const userRouter = express.Router();
const passport = require('passport');


const { signup,login } = require('../controller/usercontroller');

userRouter.route('/register').post(passport.authenticate('signup',{session: false}), signup);
userRouter.route('/login').get(login);

module.exports = userRouter;

