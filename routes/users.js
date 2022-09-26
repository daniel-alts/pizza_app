const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')

/**
 * Get all users
 */
router.route('/').get(async (req, res, next) => {
  try {
    const users = await userModel.find({}, { username: 1, user_type: 1 })

    return res.json({ status: true, users })
  } catch (err) {
    return res.status(500).json({ status: false, data: err.message })
  }
})

/**
 * Create a new user
 */
router.route('/register').post(async (req, res) => {
  try {
    const { username, password, user_type } = req.body
    const userObject = {
      username,
      password,
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
})

module.exports = router
