const express = require('express');
const { getAllUsers, addUser } = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/', addUser);

module.exports = usersRouter;
