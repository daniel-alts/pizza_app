const express = require('express')
const authController = require('../controllers/userController')
const passport = require('passport')
const userRouter = express.Router()

// userRouter.post('/register', userController.createUser)
// userRouter.get('/getusers', userController.getUsers)
// userRouter.delete('/deleteuser/:id', userController.deleteUserById)
userRouter.post('/signup',  passport.authenticate('signup', {session:false}), authController.signUp)
userRouter.post('/login', passport.authenticate('login', {session:false}), authController.login)

module.exports = userRouter