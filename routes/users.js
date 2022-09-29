const express = require("express")
const userModel = require("../models/users")
const moment = require('moment');
const { addUser, getUser } = require("../controller/user");

const userRouter = express.Router()

userRouter.get("", getUser)

userRouter.post("", addUser)

module.exports = {
    userRouter
}