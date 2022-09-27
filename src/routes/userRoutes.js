const express = require('express');
const userRoutes = express.Router();
const { registerUser } = require('../controllers/userController');



userRoutes.post('/', registerUser);




module.exports = userRoutes;