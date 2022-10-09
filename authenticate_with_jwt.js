const passport = require("passport");
const localStrtegy = require("passport-local").Strategy;
const usersModel = require("./userModel");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRETE,
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
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
  new localStrtegy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req,username, password, done) => {
      try {
        const user_type = req.body.user_type;
        const age = req.body.age;
        const user = await usersModel.create({
         username,password,user_type, age
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
    'login',
    new localStrtegy(
      {
        usernameField: "username",
        passwordField: "password",
       
      },
      async (username, password, done) => {
        try {
        
          const user = await usersModel.findOne({
           username
          });
          console.log( user);
          if(!user){
            return done(null, false, {message: 'user not found'});
          }
          const validated = await user.isValidPasswor(password);
          if(!validated){
            return done(null, false, {message: 'wrong password'});
          }
        
          return done(null, user, {message: 'user login successfully'});
        } catch (error) {
          done(error);
        }
      }
    )
  );