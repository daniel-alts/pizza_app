const userRouter = require('express').Router();
const userController = require('../controllers/users.controller');

// Users Routes
userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
