const express = require('express')
const UserRouter = express.Router()

const userController = require("../controllers/userController")

UserRouter.get('/', userController.allUsers)
UserRouter.patch('/:id', userController.updateUser)
UserRouter.delete('/:id', userController.deleteUser)

module.exports = UserRouter 