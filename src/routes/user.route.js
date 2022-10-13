const users = require('express').Router();
const userController = require('../controllers/user.controller');


users
.route('/')
.get(userController.getUsers)
.post(userController.createUser)

users
.route('/:_id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = users;

