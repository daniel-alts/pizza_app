const express = require("express");
const { logUserIn } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", logUserIn);

module.exports = userRouter;
