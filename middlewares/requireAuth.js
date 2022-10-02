const User = require('../models/user.model');

/** requires basic authentication */
const requireAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }

  const [type, value] = authorization.split(' ');
  // Must use basic auth
  if (type !== 'Basic' || !value) {
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }

  // value is a base64 encoded string format <username>:<password?
  const [username, password] = Buffer.from(value, 'base64')
    .toString().split(':');

  const user = await User.findOne({ username, password })
  if (!user) {
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }

  req.user = user;
  next();
}

module.exports = requireAuth;