const express = require('express')
const { registerNewUser, login } = require('../controllers/userController')
// const {authenticateUser} = require('../authentication/authenticate')
const userRoute = express.Router()

userRoute.post("/register", registerNewUser)
userRoute.post("/login",login)

module.exports = {userRoute}