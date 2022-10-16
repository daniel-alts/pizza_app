const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const jwtStrategy = () => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('jwt_token');
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new Strategy(opts, function (payload, done) {
      try {
        return done(null, payload);
      } catch (err) {
        return done(err);
      }
    })
  );
};

module.exports = jwtStrategy;
