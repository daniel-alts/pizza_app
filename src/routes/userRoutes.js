const express = require('express');
const userController = require('../../pizza_app/controllers/userController')


const userRouter = express.Router();

//get details of a particular user
userRouter.get('/login', userController.login);
userRouter.post('/login', userController.login);


//signup
userRouter.get('/signup', userController.signUp);
userRouter.post('/signup', userController.signUp);

module.exports = userRouter