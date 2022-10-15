const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModels');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


// ...


passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'process.env.JWT_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
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
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password,  done) => {
        try {
          const user = await UserModel.create({ email, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );


  // ...

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // ..








// const UserModel = require("../models/userModels");
// const User = require("../controllers/userController")
// const userModel = require("../models/userModels")
// const bcrypt = require('bcrypt')

// exports.authenticateUser = async (req, res, next) => {
//     const authorization = req.headers.authorization
//     try {
//         if(!authorization) {
//             return res.status(403).send({
//                 message:"Forbidden"
//             })
//         }
//         const encoded = authorization.substring(6);
//         const decoded =  Buffer.from(encoded, 'base64').toString('ascii')
//         const [username, password] = decoded.split(':')
//         const authUser = await User.findOne({username});
//         if(!authUser) {
//             return res.status(403).send({
//                 message: 'Forbidden'
//             })
//         }
//         if(authUser){
//              const match = await bcrypt.compare(password,  authUser.password)
//        if(!match) {
//         return res.status(403).send({message: 'Forbidden'})
//        }
//        if(match) {
//         req.authUser =  {
//             username:authUser.username,
//             role: authUser.user_type
//        }
//        }
      
//     }
//     next()
//     } catch (error) {
//         next()
//         res.json({
//             message: error
//         })

//         next()
        
//     }
// }
