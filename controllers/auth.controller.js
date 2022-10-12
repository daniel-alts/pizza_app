const generateToken = require('../utils/tokenGenerator.utils');
const userModel = require('../models/users.model');
require('dotenv').config();

/**
 * login() - checks if user is in database and adds token
 * @req: contains request details
 * @res: contains response details
 *
 * Return: Logged In Successfully!
 * If no user, return Username not found!
 * If password is incorrect, return Incorrect password!
 */
async function login(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return res.json({
      status: false,
      message: 'Provide login credentials',
    });
  }

  // Get user details
  const auth = new Buffer
    .From(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':');
  const username = auth[0];
  const password = auth[1];

  // Find user in database
  const user = await userModel.findOne({ username });

  // If user is not found
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'Username not found!',
    });
  }

  // Check if user's password is correct
  if (user.password !== password) {
    return res.status(404).json({
      status: false,
      message: 'Incorrect password!',
    });
  }

  // If user's password is correct
  const token = generateToken();
  process.env.TOKEN = token;
  process.env.USER_TYPE = user.userType;

  return res.json({
    status: true,
    message: 'Logged In Successfully!',
  });
}

/**
 * logout() - removes token
 * @req: contains request details
 * @res: contains response details
 *
 * Return: Logged Out Successfully!
 */
async function logout(req, res) {
  // Remove token from .env
  process.env.TOKEN = '';
  process.env.USER_TYPE = '';

  return res.json({
    status: true,
    message: 'Logged Out Successfully!',
  });
}

module.exports = {
  login,
  logout,
};
