const User = require('../model/user')

module.exports = async(req, res, next) => {
  const username = req.headers['username']
  const password = req.headers['password']

  const user = await User.findOne({username: username, password: password})
  if (!user) return res.status(401).json({ msg: "access denied! user not authenticated." })

  req.user = user
  
  next()

}