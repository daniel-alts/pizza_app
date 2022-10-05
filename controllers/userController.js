const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { username, password, user_type } = req.body;

  try {
    const user = new User({ username, password, user_type });
    await user.save();
    return res.json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).send("Something went wrong on the server");
  }
};

const logUserIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).send("This user does not exist in the Database");
  if (password !== user.password)
    return res.status(400).send("This password is incorrect");
  return res.send("Login successful!");
};

module.exports = { createUser, logUserIn };
