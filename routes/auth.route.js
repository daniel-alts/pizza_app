const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');

// Authentication Routes
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

module.exports = authRouter;
