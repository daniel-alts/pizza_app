const userRouter = require("express").Router();
const UserController = require('../controllers/userController')

userRouter
.post('/register', UserController.register)
.post('/login', UserController.login)

module.exports = userRouter