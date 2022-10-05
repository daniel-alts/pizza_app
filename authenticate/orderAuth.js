const orderModel = require('../models/orderModel');

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

module.exports = authenticateOrder;