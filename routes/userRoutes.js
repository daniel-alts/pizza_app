const userRouter = require("express").Router();
const UserController = require("../controls/userController");
const { authenticatedUser } = require("../middleware/auth");

userRouter
  .post("/register", UserController.register)
  .post("/login", authenticatedUser, UserController.login)
  .get("/getAllUsers", UserController.getAllUsers)
  .get("/getUserbyId/:id", UserController.getUserbyId)
  .put("/updateUser/:id", UserController.updateUser)
  .delete("/deleteUser/:id", UserController.deleteUser);

module.exports = userRouter;
