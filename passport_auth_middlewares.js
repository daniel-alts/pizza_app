const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("./models/userModel");

passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      try {
        done(null, payload);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Sign up passport middleware
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { user_type } = req.body;
      try {
        const user = await User.create({ username, password, user_type });
        return done(null, user); // sets req.user = user
      } catch (error) {
        done(error);
      }
    }
  )
);

// Sign in passport middleware
passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user || !(await user.verifyPassword(password))) {
          return done(null, false, {
            message: "Username or password incorrect!",
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
