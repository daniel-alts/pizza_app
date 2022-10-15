const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user')
const passport = require('passport')

userRouter.post('/signup', passport.authenticate('signup', {session: false}), userController.signup)
userRouter.post('/login', userController.login)

module.exports = userRouter