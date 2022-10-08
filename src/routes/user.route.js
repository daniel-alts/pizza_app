const users = require('express').Router();
const userController = require('../controllers/user.controller');


users
.route('/')
.get(userController.getUsers)
.post(userController.postUser)

users
.route('/:_id')
.get(userController.getUser)
.patch(orderController.updatedUser)
.delete(orderController.deleteUser)

module.exports = users;

