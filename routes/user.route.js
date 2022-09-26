const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.model');
const requireAuth = require('../middlewares/requireAuth');
const { validateCreateUser } = require('../middlewares/validator');

userRouter.get('/', requireAuth, async (req, res) => {
  return res.json({ status: true, user: req.user })
});

userRouter.post('/', validateCreateUser, async (req, res) => {
  const { username } = req.body

  if (await User.findOne({ username })) {
    return res.json({ status: false, error: 'User already exist' })
  }

  const user = await User.create(req.body)
  
  return res.json({
    status: true,
    message: 'User created'
  })
})

module.exports = userRouter;