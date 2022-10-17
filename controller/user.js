const User = require("../model/userModel");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send(`No user with id: ${userId}`);
  }
  res.status(200).json({ user });
};

const createUser = async (req, res) => {
  const body = req.body;
  const user = await User.create(body);
  res.status(201).json({ user });
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByIdAndUpdate({ userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  res.status(200).send('User Deleted')
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
