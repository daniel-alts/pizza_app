const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();


// USER ROUTER WITH SIGNUP AND LOGIN ROUTES
userRouter.route('/signup')
    .post(userController.signUp)
userRouter.route('/login')
    .post(userController.login)


    
module.exports=userRouter
