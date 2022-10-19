const express = require('express');
const authorizeAdmin = require('../auth');
const usersRoute = express.Router();

const {
  getUsers,
  getUserByID,
  deletebyId,
  deleteMany
} = require('../controller/usersControllers');


usersRoute.get('/', getUsers);
usersRoute.get('/:id', authorizeAdmin, getUserByID);
usersRoute.delete('/email', deleteMany)
usersRoute.delete('/:id', deletebyId);


module.exports = usersRoute;
