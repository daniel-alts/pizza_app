const User = require('../models/userModel');

const registerUser = async (req, res) => {
  const data = req.body;
  data.user_type = 'user';
  const user = await User.create(data);
  res
    .status(200)
    .json({ msg: 'Endeavour successful! You have just registered...', user });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res
    .status(200)
    .json({ msg: 'Endeavour successful! User now retrieved...', user });
};

module.exports = { registerUser, getUser };
