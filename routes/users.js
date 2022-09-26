const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')

/**
 * Create a new user
 */
router.route('/register').post((req, res, next) => {
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
