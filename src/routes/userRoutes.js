const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');



userRoutes.post('/',
    async (req, res, next) => {
        try {
            userController.registerUser(req, res)
        } catch(error) {
            next(error);
        }
    }
);




module.exports = userRoutes;