const express = require("express");

const { signupUser, loginUser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);

module.exports = { userRouter };