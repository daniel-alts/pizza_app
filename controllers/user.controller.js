const User = require('../models/user.model');

exports.getUser = async (req, res) => {
  return res.status(200).json({ status: true, user: req.user })
}

exports.createUser = async (req, res) => {
  const { username } = req.body

  if (await User.findOne({ username })) {
    return res.status(400).json({ status: false, error: 'User already exist' })
  }

  await User.create(req.body)

  return res.status(201).json({
    status: true,
    message: 'User created'
  })
}