const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { RegisterUser, loginUser, getUsersById, updateUser, deleteUser } = require("../controller/user_controller");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", RegisterUser);

userRouter.post("/login", loginUser);

userRouter.get("/getuserinfo",passport.authenticate("jwt",{session: false}),getUsersById)
userRouter.put("/updateuser", passport.authenticate("jwt", {session: false}), updateUser)
userRouter.delete("/deleteUser/:userid", passport.authenticate("jwt", {session: false}), deleteUser)
module.exports = { userRouter };
