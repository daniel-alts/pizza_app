const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getOneUser);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);




//exports
module.exports = userRouter;