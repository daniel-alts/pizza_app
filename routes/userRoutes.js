const express = require('express')
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/register', userController.createUser)
userRouter.get('/getusers', userController.getUsers)
userRouter.delete('/deleteuser/:id', userController.deleteUserById)

module.exports = userRouter