const User = require('../model/user')

module.exports = async (req, res, next) => {
  
  if (req.user.userRole !== 'admin') return res.status(403).json({ msg: "access forbidden! hey, you not allow to tamper with this route." })
  
  next()

}