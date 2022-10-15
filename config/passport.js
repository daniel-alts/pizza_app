const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model');

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: process.env.JWT_EXPIRES_IN,
  }
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(strategyOptions, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user)
      } catch (err) {
        return done(err, false);
      }
    })
  )
}