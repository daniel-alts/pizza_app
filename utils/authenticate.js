const passport = require('passport');
const localStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config()

const db = require('../models/model');
const userModel = db.User;


passport.use(
  new JWTstrategy(
    {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
  },
  async (token, done) => {
    try {
      return done(null, token.user)
    } catch (error) {
      done(error)
    }
  }
  )
);

// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback : true
    },
    
    async (req, email, password, done) => {
      try {
        const name = req.body.name;
        const username = req.body.username;
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;
        if (!req.body.user_type) {
          const user = await userModel.create({
            name, email, username,
            password, phoneNumber, address
          })
          return done(null, user)
        }

        if (req.body.user_type === 'admin') {
          const user_type = 'admin';
          const user = await userModel.create({
            name, email, username,
            password, user_type, phoneNumber, address
          })
          return done(null, user)
        }
        
      } catch (error) {
        done(error)
      }
    }
  )
);



passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },

    async (email, password, done) => {

      try {
        const user = await userModel.findOne({email})

        if (!user) {
          return done(null, false, {
            message: 'User not found'
          })
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {message: 'Wrong Password'})
        }

        return done(null, user, {
          message: 'Logged in Successfully'
        })


      } catch (error) {
        return done(error)
      }
    }
  )
)









// const userModel = db.User

// const authenticate = async (req, res, next) => {
//   // get basic authentication from header
//   // const authorization = req.headers
//   // console.log(authorization)
//   const authorization = req.headers.authorization;
//   try {
//     if (authorization) {
//       // console.log(authorization2)
//       const encoded = authorization.split(" ")[1]
//       // console.log(encoded)
//       const decoded = Buffer.from(encoded, 'base64').toString('ascii');
//       // console.log(decoded)
//       const [username, password] = decoded.split(':')
//       // console.log(password)
//       const authenticateUser = await userModel.findOne({ username });
//       // console.log(authenticatedUser.password)
//       const match = password === authenticateUser.password
//       // console.log(authenticatedUser.userType)
//       if (match){
//         req.authenticateUser = {
//           username: authenticateUser.username,
//           role: authenticateUser.userType,
//         }
//       }
      
//     }
//     next()
//   } catch (err) {
//     next()
//   }
// }


// module.exports = authenticate;