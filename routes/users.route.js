const userRouter = require('express').Router();
const userController = require('../controllers/users.controller');
const authenticate = require('../middlewares/authenticate');

// Users Routes
userRouter.get('/', authenticate(['admin']), userController.getUsers);
userRouter.get('/:userId', authenticate(['admin']), userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', authenticate(['admin', 'user']), userController.updateUser);
userRouter.delete('/:id', authenticate(['admin']), userController.deleteUser);

module.exports = userRouter;
