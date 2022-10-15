const auth = require('express').Router();
const passport = require('passport').Strategy;
const authController = require('../controllers/auth.controller');

auth.post('/login', authController.login)


auth.post('/register', authController.register)


module.exports = auth;