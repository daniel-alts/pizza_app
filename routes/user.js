const express = require('express');
const userController = require('../controller/userController');
const authenticate = require('../utils/authenticate');

const userRouter = express.Router();

userRouter.get('/', authenticate, userController.getAllUser);
userRouter.get('/:id', authenticate, userController.getUserById);
userRouter.post('/', authenticate, userController.createUser);
userRouter.put('/:id', authenticate, userController.updateUserById);
userRouter.delete('/:id', authenticate, userController.deleteUserById);


module.exports = {userRouter};