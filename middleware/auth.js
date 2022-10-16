const passport = require('passport')
const User = require('../model/user')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt



passport.use(new JwtStrategy({
  secretOrKey: process.env.JWT_SECRETE,
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
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
    let user = await User.findOne({ username })
    if (user) return done(null, false, { message: 'username already exist!' })
    
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