const express = require('express')
const authRoute = express.Router()
const { login, register, getUsers } = require('../controllers/auth')

authRoute.route('/login').post(login)
authRoute.route('/signup').post(register)
module.exports = authRoute