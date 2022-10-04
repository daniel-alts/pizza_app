const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');



userRoutes.post('/',
    async (req, res, next) => {
        try {
            const userDetails = req.body;
            await userController.registerUser(req, res, userDetails)
        } catch(error) {
            next(error);
        }
    }
);




module.exports = userRoutes;