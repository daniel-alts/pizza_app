const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const localStrategy = require('passport-local').Strategy
const userModel = require('../models/userModel')


require('dotenv').config()

passport.use(
    new JWTStrategy({
        secretOrKey: process.env.JWT_SECRET,
         jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) =>{
        try{
        return done(null, token.user)
        }
        catch(err){
            done(err)
        }
    }
)
)

passport.use(
    "signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
            const name = req.body.name
            const username = req.body.username
          const user = await userModel.create({ email, password, name, username });
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );


  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ username });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          const validate = user.isValidPassword(password);
          if (!validate) {
            return done(null, false, { message: "Password is incorrect" });
          }
          return done(null, user, { message: "Login Successfull" });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  
