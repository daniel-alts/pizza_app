const express = require('express')
const register = require('../controller/userModel')

const userRouter = express.Router();


userRouter.post('/register', register)
// userRouter.post('/login', login)


module.exports = userRouter