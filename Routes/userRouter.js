const express = require("express")

const {makeUser, getUserById, getUsers} = require("../Controllers/userController")

const userRouter = express.Router()

userRouter.post('/', makeUser)

userRouter.get('/:userId', getUserById)

userRouter.get('/users', getUsers)

// userRouter.patch('/:id', updateUsers)

// userRouter.delete('/:id', deleteUsers)

module.exports = userRouter 
