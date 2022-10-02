const express = require('express');
const { getUser, createUser } = require('../controllers/user.controller');
const userRouter = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { validateCreateUser } = require('../middlewares/validator');

userRouter.get('/', requireAuth, getUser);

userRouter.post('/', validateCreateUser, createUser)

module.exports = userRouter;