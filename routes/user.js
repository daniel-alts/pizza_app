const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUser);
userRouter.get('/:id', userController.getUserById);
// userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUserById);
userRouter.delete('/:id', userController.deleteUserById);


module.exports = {userRouter};