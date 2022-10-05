const express = require('express')
const UserRoute = express.Router()

const userController = require("../controllers/userController")
const { passwordAuth, adminAuth, userAuth } = require("../handlers/authentication")


UserRoute.post('/signup', userController.signup)
UserRoute.get('/', [passwordAuth, adminAuth], userController.allUsers)
UserRoute.patch('/:id', [passwordAuth], userController.updateUser)
UserRoute.delete('/:id',[passwordAuth, adminAuth], userController.deleteUser)

module.exports = UserRoute
