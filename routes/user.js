const express = require("express");

const userRouter = express.Router();

const user_controller = require("../controller/userController");

module.exports = userRouter;
