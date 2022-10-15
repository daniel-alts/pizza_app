const moment = require('moment');
const userModel = require('../models/users.model');

/**
 * createUser() - adds new user details to database
 * @req: contains request details
 * @res: contains response details
 *
 * Return: newly created user details
 */
async function createUser(req, res) {
  const {
    name,
    username,
    password,
    userType,
  } = req.body;

  const usernameExist = await userModel.findOne({ username });

  if (usernameExist) {
    return res.status(401).json({
      status: false,
      message: 'Username exist!',
    });
  }

  const user = await userModel.create({
    name,
    username,
    password,
    userType,
    createdAt: moment().toDate(),
  });

  return res.json({
    status: true,
    user,
  });
}

/**
 * getUserById() - gets user with a specific id
 * @req: contains request details
 * @res: contains response details
 *
 * Return: user details with specified id
 * If user not found, return null
 */
async function getUserById(req, res) {
  const { userId } = req.params;
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      status: false,
      user: null,
    });
  }

  return res.json({
    status: true,
    user,
  });
}

/**
 * getUsers() - gets all users details
 * @req: contains request details
 * @res: contains response details
 *
 * Return: details of all users
 */
async function getUsers(req, res) {
  const users = await userModel.find();

  return res.json({
    status: true,
    users,
  });
}

/**
 * updateUser() - updates user details with specified id
 * @req: contains request details
 * @res: contains response details
 *
 * Return: updated user details
 */
async function updateUser(req, res) {
  const { id } = req.params;
  const updateDetails = req.body;

  const user = await userModel.findOneAndUpdate(id, updateDetails, {
    new: true,
  });

  return res.json({
    status: true,
    user,
  });
}

/**
 * deleteUser() - remove user details from database
 * @req: contains request details
 * @res: contains response details
 *
 * Return: acknowledge: true
 */
async function deleteUser(req, res) {
  const { id } = req.params;

  const user = await userModel.deleteOne({ _id: id });

  return res.json({
    status: true,
    user,
  });
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
