const userModel = require('../models/userModel');
const localStrategy = require('passport-local').Strategy;
require('dotenv').config();
const passport = require('passport');
const moment = require('moment');
const bodyParser = require('body-parser');
const express = require('express')


let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// const authRouter = express.Router();


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
        async ( req, username, password, done ) => {
            try {

                const user_type = await req.body.user_type;
                const user = await userModel.create({ username , password, user_type, created_at: moment().toDate()});

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ username });

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

async function adminAuth(req, res, next) {
    
    const token = await req.query.secret_token

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const username = decoded.username
        console.log(decoded)
        const user = await userModel.findOne({ username });

        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        if(user.user_type !== "admin") {
            return done(null, false, { message: 'Unauthorized' });
        }

        return done(null, token.user)
      } catch (err) {
        return res.status(401).send("Invalid Access");
      }
}

// async function passwordAuth(req, res, next) {
//     const { authorization } = req.headers

//     if (!authorization) {
//         return res.status(400).json({ status: false, message: 'Invalid Request. Login to make operation' })
//     }
//     const auth = new Buffer.from(authorization.split(" ")[1], 'base64').toString().split(":")

//     const username = auth[0]
//     const password = auth[1]

//     const user = await userModel.find({ username: username })
//     if (user.length === 0) {
//         return res.status(404).json({ status: false, message: "Username not found. Please signup" })
//     }

//     if (user[0].password !== password) {
//         return res.status(400).json({ status: false, message: "Invalid password" })
//     }

//     next()
// }


// async function adminAuth(req, res, next) {
//     const { authorization } = req.headers

//     if (!authorization) {
//         return res.status(400).json({ status: false, message: 'Invalid Request. Login to make operation' })
//     }
//     const auth = new Buffer.from(authorization.split(" ")[1], 'base64').toString().split(":")

//     const username = auth[0]
//     const password = auth[1]

//     const user = await userModel.find({ username: username, password: password })
//     if (user.length === 0) {
//         return res.status(404).json({ status: false, message: "User not found. Please signup" })
//     }

//     if (user[0].user_type !== 'admin') {
//         return res.status(401).json({ status: false, message: "Not an Admin! You are unauthorized for this operation" })
//     }

//     next()
// }

// async function userAuth(req, res, next) {
//     const { authorization } = req.headers

//     if (!authorization) {
//         return res.status(400).json({ status: false, message: 'Invalid Request. Login to make operation' })
//     }
//     const auth = new Buffer.from(authorization.split(" ")[1], 'base64').toString().split(":")

//     const username = auth[0]
//     const password = auth[1]

//     const user = await userModel.find({ username: username, password: password })
//     if (user.length === 0) {
//         return res.status(404).json({ status: false, message: "User not found. Please signup" })
//     }

//     if (user[0].user_type !== 'user') {
//         return res.status(401).json({ status: false, message: "Not a User! You are unauthorized for this operation" })
//     }

//     next()
// }


// module.exports = {
//     passwordAuth, adminAuth, userAuth
// }

module.exports = {
    adminAuth
}
