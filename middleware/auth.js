const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../Model/userModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require("dotenv").config()


passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_TOKEN ,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token")
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        try {
          const user = await userModel.create({ username, password, usertype: req.body.usertype});
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use("login",
  new localStrategy({
    usernameField: "username",
    passwordField: "password"
  },
    async (username, password, done)=>{
        try{
            const user = await userModel.findOne({username});
            if(!user){
                return done(null, false, {message: "user not found!"})
            }
            const validate = await user.isValidPassword(password)
            if(!validate){
                return done (null, false, {message: "Invalid password"})
            }
            return done(null, user, {message: "Logged in successfully!"})
        }catch(error){
            return done(error)
        }
    }
  )
  )


