const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.model');
const requireAuth = require('../middlewares/requireAuth');

userRouter.get('/', requireAuth, async (req, res) => {
  return res.json({ status: true, user: req.user })
});

userRouter.post('/', async (req, res) => {
  return res.json({ status: true, message: 'Login successful' })
})

userRouter.post('/login', async (req, res) => {
  return res.json({ status: true, message: 'Login successful' })
})

module.exports = userRouter;