const User = require('../models/userModel');

const registerUser = async (req, res) => {
  const data = req.body;
  data.user_type = 'user';
  const user = await User.create(data);
  res
    .status(200)
    .json({ msg: 'Endeavour successful! You have just registered...', user });
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

module.exports = { registerUser, seedUsers };
