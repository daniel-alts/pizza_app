const userModel = require('../model/userModel');

const registerUser = async (req, res) => {
  const { name, username, password, user_type } = req.body;

  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: 'User already exists' });
    }
    const user = await userModel.create({
      name,
      username,
      password,
      user_type,
    });
    return res.status(201).json({ status: true, user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { registerUser };
