const User = require('../models/user_models')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

require('dotenv').config()

passport.use(
    new JWTStrategy(
        {
          secretOrKey: process.env.JWT_SECRET,
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
          try {
            return done(null, token.user)
          }catch (err){
            done(err)
          }
        }
    )
)
//register method
passport.use(
    'signup',
    new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          usertypeField: 'user_type'
        },
        async (email, password, user_type) => {
          try {
            const user = await User.create({ email, password, user_type})

            return done(null, user)
          }catch (err){
            done(err)
          }
        }
    )
)

passport.use(
    'login',
    new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          usertypeField: 'user_type'
        },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ email })

            if (!user){
              return done(null, false, { message: 'User does not exist' })
            }
            const validate = await User.isValidPassword(password)

            if (!validate){
              return done(null, false, { message: 'Invalid username or password'})
            }
            return done(null, user, { message: 'Logged in successfully' })
          }catch (err){
            return done(err)
          }
        }
    )
)

// exports.registerUser = async(req, res) => {
//     try {
//         // hash the password
//         req.body.password = await bcrypt.hash(req.body.password, 10);
//         // create a new user
//         const user = await User.create(req.body);
//         // send new user as response
//         res.json(user);
//       } catch (error) {
//         res.status(400).json({ error });
//       }
// }

exports.loginUser = async(req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
          const result = await bcrypt.compare(req.body.password, user.password);
          if (result) {
            // sign token and send it in response body
            const token = await jwt.sign({ username: user.username }, process.env.JWT_SECRET);
            res.json({ token });
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
}