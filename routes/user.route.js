const express = require('express')
const userController = require("../controllers/userController")

const userRoute = express.Router()

userRoute.get('/', userController.getUsers);
userRoute.get("/:id", userController.getUserById)
userRoute.post("/", userController.addUser)
userRoute.patch("/:id", userController.updateUser)
userRoute.delete("/:id", userController.deleteUser)

module.exports = userRoute