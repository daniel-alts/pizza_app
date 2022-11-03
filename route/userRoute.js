const express = require('express');
const passport = require('passport');
const userController = require('../controller/userController');

const authRouter = express.Router();

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
     userController.signup
);

authRouter.post(
    '/login',
 userController.login
);

module.exports = authRouter;