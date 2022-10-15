const authRouter = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
require('dotenv').config();

// Authentication Routes
authRouter.post('/signup', passport.authenticate('signup', { session: false }), authController.signup);
authRouter.post('/login', authController.login);
// authRouter.post('/logout', authController.logout);

module.exports = authRouter;
