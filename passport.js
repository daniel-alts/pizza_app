const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("./models/userModel");
module.exports = function (passport) {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, {
              message: "User with credentials not found",
            });
          }
          const checkPass = user.password === password;
          if (!checkPass) {
            return done(null, false, {
              message: "Invalid username or password",
            });
          }
          done(null, user);
        } catch (err) {
          done(err, false, {
            message: "An error occured, please try again later",
          });
        }
      }
    )
  );
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
      },
      async (token, done) => {
        await User.find({ _id: token.userID }, (err, user) => {
          if (err) {
            return done(err, false, { message: "Invalid Token" });
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false, { message: "An error occured" });
          }
        });
      }
    )
  );
};
