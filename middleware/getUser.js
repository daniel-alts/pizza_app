const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const userFromToken = jwt.verify(req.token, process.env.SECRET)
    const user = await User.findById(userFromToken.id)
    if (!user) {
      return res.status(403).json({
        error: 'user no longer exists'
      })
    }
    req.authenticatedUser = user
    next()
  } catch (err) {
    next(err)
  }
}
