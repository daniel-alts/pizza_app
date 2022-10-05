const express = require('express')
const UserRouter = express.Router()
const controller = require('../controllers/usersController')
const authenticate = require('../middleware/authenticate')

// all users
UserRouter.route('/allUsers').get(authenticate, controller.AllUsers)

// Create user
UserRouter.route('/register').post(controller.createUser)

module.exports = UserRouter