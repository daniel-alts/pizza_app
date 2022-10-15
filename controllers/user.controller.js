const User = require('../models/user.model');

exports.getUser = async (req, res) => {
  return res.status(200).json({ status: true, user: req.user })
}

exports.createUser = async (req, res) => {
  const { username } = req.body

  if (await User.findOne({ username })) {
    return res.status(400).json({ status: false, error: 'User already exist' })
  }

  const user = await User.create(req.body)
  const token = await user.generateToken()

  return res.status(201).json({
    status: true,
    message: 'User created',
    token
  })
}

exports.loginUser = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(400).json({ status: false, error: 'User not found' })
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    return res.status(400).json({ status: false, error: 'Invalid password' })
  }

  const token = await user.generateToken()

  return res.status(200).json({
    status: true,
    message: 'User logged in',
    token
  })
}