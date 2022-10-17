const User = require('../models/userModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_STRING = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  res.status(200).json({
    msg: 'Endeavour successful! You have just registered...',
    data: req.user,
  });
};

const loginUser = (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const err = new Error('Username or password is incorrect');
        return next(err);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, JWT_STRING);
        return res.json({ token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

const seedUsers = async () => {
  try {
    await User.insertMany([
      { name: 'ayomide', password: 'lovely', user_type: 'user' },
      { name: 'ayomikun', password: 'love', user_type: 'user' },
      { name: 'ayobami', password: 'lovingly', user_type: 'admin' },
      { name: 'ayokunumi', password: 'loveful', user_type: 'user' },
      { name: 'ayodimeji', password: 'loving', user_type: 'user' },
    ]);
  } catch (err) {
    throw new Error('Oops! An error occurred...');
  }
};

module.exports = { registerUser, seedUsers, loginUser };
