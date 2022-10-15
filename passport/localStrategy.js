const passport = require('passport');
const { Strategy } = require('passport-local');

const User = require('../model/userModel');

module.exports = localStrategy = () => {
  passport.use(
    new Strategy(
      {
        userNameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      }
    )
  );
};
