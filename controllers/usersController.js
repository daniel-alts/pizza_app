const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

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
const createUser = async (req, res) => {
  try {
    const { username, password, user_type } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const userObject = {
      username,
      password: hashedPassword,
    }
    if (user_type) userObject.user_type = user_type
    const user = new userModel(userObject)
    user
      .save()
      .then((result) => {
        const { id, username, user_type } = result
        const returnObj = {
          id,
          username,
          user_type,
        }
        return res.status(201).json({ status: true, data: returnObj })
      })
      .catch((err) => {
        console.log('error occured', err)
        return res.status(400).json({ status: false, message: err.message })
      })
  } catch (err) {
    res.json(err)
  }
}

module.exports = { getAllUsers, createUser }
