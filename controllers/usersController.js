const userModel = require('../models/userModel')

/**
 * Get all users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({}).populate('orders', { items: 1, total_price: 1 })
    return res.json({ status: true, users })
  } catch (err) {
    next(err)
  }
}

/**
 * Create a new user
 */
const createUser = async (req, res, next) => {
  try {
    res.json({
      status: true,
      message: 'Sign-up successful',
      user: req.user,
    })
  } catch (e) {
    next(e)
  }
}

module.exports = { getAllUsers, createUser }
