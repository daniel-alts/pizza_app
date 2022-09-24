const orderModel = require('./models/orderModel');
const userModel = require('./models/userModel');

const authenticateUser = (req, res) =>
  new Promise(async (resolve, reject) => {
    const { username, password } = req.body;
    if (!username || !password) reject('Invalid username or password.');
    const [user] = await userModel.find({ username: username });
    if (!user) reject('User Not Found');
    if (password !== user.password) reject('Invalid password');
    else resolve('Done');
  });

const authenticateOrder = (req, res, type) =>
  new Promise(async (resolve, reject) => {
    if (!req.body) reject('Invalid order');
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) reject('Invalid ID');
    if (type !== 'user' && type !== 'admin')
      reject("can't perform this operation");
    else resolve('Access Granted');
  });

module.exports = { authenticateUser, authenticateOrder };
