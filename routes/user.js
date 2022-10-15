const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');



userRouter
    .route('/')
    .get(userController.getAllusers)
    .post(userController.createUser);

userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

userRouter.route('/login')
    .post( userController.loginUser)

userRouter.route('/signup')
    .post( userController.signupUser)

module.exports = userRouter;