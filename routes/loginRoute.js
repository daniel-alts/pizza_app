const express = require('express');

const loginRouter = express.Router();

const { loginUser } = require('../controller/loginController');

loginRouter.get('/', loginUser);

module.exports = loginRouter;
