const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const getToken = require('../middleware/getToken')

router.route('/').post(getToken, async (req, res, next) => {
  try {
    const encoded = req.token
    const decoded = Buffer.from(encoded, 'base64').toString('ascii')
    const [username, password] = decoded.split(':')
    const user = await User.findOne({ username })
    const correctPassword = user === null ? false : await bcrypt.compare(password, user.password)

    if (!(user && correctPassword)) {
      return res.status(401).json({
        error: 'invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const validityPeriod = 60 * 60 * 24
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: validityPeriod })

    res.json({ token, username: user.username, name: user.name })
  } catch (err) {
    next(err)
  }
})

module.exports = router
