const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/usersController");

// GET all users..........
usersRouter.get("/", usersController.getAllUsers);

// POST a user...............
usersRouter.post("/", usersController.postUser);

// GET a single user..............
usersRouter.get("/:userId", usersController.getUser);

// UPDATE a single user.
usersRouter.patch("/:userId", usersController.updateUser);

// DELETE a single user.
usersRouter.delete("/:userId", usersController.deleteUser);

module.exports = usersRouter;
