const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');

const authenticateUser = (req, _) =>
  new Promise(async (resolve, reject) => {
    const { username, password } = req.body;
    if (!username || !password) reject('Invalid username or password.');
    const [user] = await userModel.find({ username: username });
    if (!user) reject('User Not Found');
    if (password !== user.password) reject('Invalid username or password');
    else resolve('Done');
  });

const authenticateOrder = (req, res, type) =>
  new Promise(async (resolve, reject) => {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) reject('Invalid ID');
    if (type !== 'user' && type !== 'admin')
      reject("can't perform this operation");
    else resolve('Access granted');
  });

module.exports = { authenticateUser, authenticateOrder };