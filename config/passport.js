const CONFIG = require('./config')
const Jwtstrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/userModel')
const localStrategy = require('passport-local').Strategy

// define strategy options
const opts = {}
opts.secretOrKey = CONFIG.SECRET
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

  // This middleware authenticates the user based on the username and password provided.
  // If the user is found, it sends the user information to the next middleware.
  // Otherwise, it reports an error.
  passport.use(
    'login',
    new localStrategy({}, async (username, password, done) => {
      try {
        const user = await User.findOne({ username })
        const correctPassword = user === null ? false : await user.isValidPassword(password)

        if (!(user && correctPassword)) {
          return done(null, false, { message: 'Username/password incorrect' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    })
  )

  // This middleware saves the information provided by the user to the database,
  // and then sends the user information to the next middleware if successful.
  // Otherwise, it reports an error.
  passport.use(
    'register',
    new localStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { user_type } = req.body
          const userObject = {
            username,
            password,
          }
          if (user_type) userObject.user_type = user_type
          const user = new User(userObject)
          const savedUser = await user.save()

          return done(null, savedUser)
        } catch (error) {
          done(error)
        }
      }
    )
  )
}
