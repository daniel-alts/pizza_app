const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const userSchema = require("./models/userModel");
require("dotenv").config();

// JWT STRTEGY USING THE HEADER BEARER TOKEN
// this code verify your token and return the payload
passport.use(
  // "jwt",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        return done(null, payload);
      } catch (error) {
        done(error);
      }
    }
  )
);

// SIGNUP MIDDLEWAER USING LOCAL STRATEGY

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await userSchema.create({ username, password });
        return done(null, user); // req.user = user
      } catch (error) {
        done(error, { message: "cant signup user" });
      }
    }
  )
);

// LOGIN MIDDLEWAER USING THE LOCAL STRATEGY

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await userSchema.findOne({ username });
        if (!user) {
          return done(null, false, { message: "user not found" });
        }
        const validateUser = await user.isValidPassword(password);
        if (!validateUser) {
          return done(null, false, { message: "wrong password" });
        }
        return done(null, user, { message: "logging successful" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// --------------------------------------------------------------------
//BEARER AUTHENTICATION USING HEADER
// --------------------------------------------------------------------
// exports.authenticateUser = async function (req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: "user details must be provided" });
//   }

//   const encryptedAuth = authHeader.split(" ")[1];
//   const decrytedAuth = new Buffer(encryptedAuth, "base64").toString(); // convert encrypted token using base64
//   const user_details = decrytedAuth.split(":");
//   const username = user_details[0];
//   const password = user_details[1];
//   // grab the database user
//   const user = await userSchema.findOne({ username: username?.toLowerCase() });
//   if (!user) {
//     return res.status(404).json({ message: "username not found" });
//   }
//   // console.log(user, password);
//   res.locals.user = user;

//   if (user.password !== password.toLowerCase()) {
//     return res.status(404).json({ message: "incorrect password" });
//   }

//   next();
// };

// exports.authenticateAdmin = function (req, res, next) {
//   const user = res.locals.user;
//   if (user.user_type !== "admin") {
//     return res.status(403).json({ message: "All user must have a role" });
//   }
//   next();
// };
