const { getUsers, addUser, updateUser, deleteUser } = require('../Controller/userController')
const express = require('express');
const userRoute = express.Router();

userRoute.get('/', getUsers)

userRoute.post('/', addUser)

userRoute.patch('/:id', updateUser)

userRoute.delete('/:id', deleteUser)


module.exports = userRoute;