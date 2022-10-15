const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');
const UserModel = require('../models/userModel');
require('dotenv').config();

const userServices = require('../services/userServices');


const basicAuth = async (req, userTypes) => {
    const encodedAuth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(encodedAuth, 'base64').toString().split(':') || '';
    const user = await userServices.findByUsername(username);
    if (!user || user.length == 0) {
        req.ERROR_MESSAGE = 'Invalid username.';
        return false;
        // return res.status(401).json({message: "Invalid username."});
    }

    if (user.password !== password) {
        req.ERROR_MESSAGE = 'Invalid password.';
        return false;
        // return res.status(401).json({message: "Invalid password."});
    }

    if (!(userTypes.includes(user.userType))) {
        req.ERROR_MESSAGE = "User is un-authorized. Please, contact an admin.";
        return false;
        // return res.status(401).json({ message: "You're not authorized. Please, contact an admin." });
    }
    return true;
}



//Retrieve and validate JWT Token
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                const user = await token.user;
                return done(null, user);
            } catch(error) {
                done(error);
            }
        }
    )
);


//Save user details to the DB
passport.use('register', 
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async(req, username, password, done) => {
            try {    
                const body = req.body;
                const user = await UserModel.create({ username, password, userType: body.userType });
                return done(null, user);
            } catch(error) {
                done(error);
            }
        }
    )
)


//Validates user credentials
passport.use('login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ username });
                if (!user) {
                    return done(null, false, {message: "User not found. Please, register."})
                }
                const passwordIsValid = await user.isValidPassword(password);
                if (!passwordIsValid) {
                    return done(null, false, { message: "Incorrect password" });
                }
                return done(null, user, { message: `Welcome back ${ user.username }.` });
            } catch(error) {
                done(error)
            }
        }
    )
)



