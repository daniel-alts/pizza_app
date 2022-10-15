const express = require('express');
const passport = require('passport')
const usersController = require("../controllers/usersController");
const usersRouter = express.Router();
require("../middleware/auth")

usersRouter.route('/').get(passport.authenticate('jwt', {session: false }), usersController.getAllUsers)

usersRouter.route('/:id').get(passport.authenticate('jwt', {session: false }), usersController.getUserbyId)
usersRouter.route('/:id').patch(passport.authenticate('jwt', {session: false }), usersController.updateUser)
usersRouter.route('/:id').delete(passport.authenticate('jwt', {session: false }), usersController.deleteUser)

module.exports = usersRouter