const express = require('express');

const userRouter = express.Router();

const { createUser } = require('../controller/usercontroller');

userRouter.route('/create').post(createUser);

module.exports = createUser;

