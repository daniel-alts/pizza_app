// const User = require('../model/user')

// module.exports = async(req, res, next) => {
//   const username = req.headers['username']
//   const password = req.headers['password']

//   const user = await User.findOne({username: username, password: password})
//   if (!user) return res.status(401).json({ msg: "access denied! user not authenticated." })

//   req.user = user
  
//   next()

// }


const passport = require('passport')
const User = require('../model/user')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


passport.use(new JwtStrategy({
  secretOrKey: 'nmamama',
  jwtFromRequest : ExtractJwt.fromHeader('authToken')
}, async (token, done) => {
  try {
    return done(null, token.user);
} catch (error) {
    done(error);
  }
  
}))


passport.use('register', new LocalStrategy({

  usernameField: "username",
  passwordField: "password",

}, async (username, password, done) => {

  try {
    let user = await User.findOne({username})
    if (user) return done(null, false, { message: "Username already exists." })
    
    user = new User({ username, password })

    user.password = await user.hashPassword(user.password)

    await user.save()

    return done(null, user)
  } catch (error) {
    return done(error)
  }
}))



passport.use('login', new LocalStrategy({

  usernameField: "username",
  passwordField: "password",

}, async (username, password, done) => {

  try {
    // user email exit
    //validate if user password match the one in the db
    const user = await User.findOne({ username })
    if (!user) return done(null, false, { message: 'username or password is incorrect.' })
    
    const isValid = await user.isValidPassword(password)
    if(!isValid) return done(null, false, {message: "username or password is incorrect."})
    
    
    return done(null, user, { message: "successfully logged in."})
  } catch (error) {
    return done(error)
  }
}))