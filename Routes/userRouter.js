const express = require("express")

const {makeUser, getUserById, getUsers, deleteUser, updateUser} = require("../Controllers/userController")

const userRouter = express.Router()

userRouter.post('/', makeUser)

userRouter.get('/:userId', getUserById)

userRouter.get('/users', getUsers)

userRouter.patch('/:id', updateUser)

userRouter.delete('/:id', deleteUser)

module.exports = userRouter 
