const userModel = require('../models/userModel');

const authenticateUser = (req, res) =>
  new Promise(async (resolve, reject) => {
    const { username, password } = req.body;
    if (!username || !password) reject('Invalid username or password.');
    const [user] = await userModel.find({ username: username });
    if (!user) reject('User Not Found');
    if (password !== user.password) reject('Invalid password');
    else resolve('Done');
  });

module.exports = authenticateUser;
