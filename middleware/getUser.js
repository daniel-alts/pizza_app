const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const userFromToken = jwt.verify(req.token, process.env.SECRET)
    const user = await User.findById(userFromToken.id)
    req.authenticatedUser = user
    next()
  } catch (err) {
    next(err)
  }
}
