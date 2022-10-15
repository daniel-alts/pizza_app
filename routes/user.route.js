const express = require('express');
const passport = require('passport');
const { getUser, createUser, loginUser } = require('../controllers/user.controller');
const userRouter = express.Router();
// const requireAuth = require('../middlewares/requireAuth');
const { validateCreateUser } = require('../middlewares/validator');

userRouter.get('/', passport.authenticate('jwt', { session: false }), getUser);

userRouter.post('/', validateCreateUser, createUser)

userRouter.post('/login', loginUser)

module.exports = userRouter;