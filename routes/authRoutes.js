const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const AuthController = require('../controllers/authController')

const authRouter = express.Router()

authRouter.post('/signup', passport.authenticate('signup', { session: false }), AuthController.signup)

authRouter.post('/login', async (req, res, next) => passport.authenticate('login', (err, user, info) => {
    AuthController.login(req, res, { err, user, info})
})(req, res, next))


module.exports = authRouter;