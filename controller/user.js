const User = require('../model/user')

module.exports = {
  createUser: async (req, res, next) => {
   const user =  new User({
      username: req.body.username,
      password: req.body.password,
      userRole: req.body.userRole
    })

    await user.save()
    res.status(200).json(user)
  }
  
}