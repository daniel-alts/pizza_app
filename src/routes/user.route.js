const users = require('express').Router();
const userController = require('../controllers/user.controller');
const { userauth, adminauth } = require('./../middleware/auth');
const passport = require('passport');
users.use(passport.authenticate('jwt', { session: false}))

users
.route('/')
.get(adminauth, userController.getUsers)
.post(adminauth, userController.createUser)

users
.route('/:_id')
.get(userauth, userController.getUser)
.patch(userauth, userController.updateUser)
.delete(adminauth, userController.deleteUser)

module.exports = users;

