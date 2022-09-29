const express = require('express')
const UserRouter = express.Router()

const userController = require("../controllers/userController")
const { passwordAuth, adminAuth, userAuth } = require("../middleware/authMiddleware")


UserRouter.post('/signup', userController.signup)
UserRouter.get('/', [passwordAuth, adminAuth], userController.allUsers)
UserRouter.patch('/:id', [passwordAuth], userController.updateUser)
UserRouter.delete('/:id',[passwordAuth, adminAuth], userController.deleteUser)

module.exports = UserRouter