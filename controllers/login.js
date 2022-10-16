const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.route('/').post(async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err) { return next(err) }
      if (!user) { return next(new Error('Username/password incorrect'))}

      req.login(user, { session: false }, async (err) => {
        if (err) { return next(err) }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        const validityPeriod = 60 * 60 * 24
        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: validityPeriod })

        return res.json({ token, username: user.username, name: user.name })
      })
    } catch (e) {
      next(e)
    }
  })(req, res, next)
})

module.exports = router
