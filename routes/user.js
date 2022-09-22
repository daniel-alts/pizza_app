const express = require("express");

const userRouter = express.Router();

const user_controller = require("../controller/userController");

userRouter.post("/", user_controller.add_user);

userRouter.get("/", user_controller.all_users);

module.exports = userRouter;
