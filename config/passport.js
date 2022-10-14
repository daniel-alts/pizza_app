const Jwtstrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/userModel')

// define strategy options
const opts = {}
opts.secretOrKey = process.env.SECRET
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

module.exports = (passport) => {
  passport.use(
    new Jwtstrategy(opts, async (userFromToken, done) => {
      try {
        const user = await User.findById(userFromToken.id)
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      } catch (e) {
        console.log(e)
      }
    })
  )
}
