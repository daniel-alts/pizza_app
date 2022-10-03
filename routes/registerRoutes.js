const express = require('express');
const registerRoute = express.Router();

const { registerUser } = require('../controller/registerController');

registerRoute.post('/', registerUser);

module.exports = registerRoute;
