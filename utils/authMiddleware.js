const passport = require("passport");
const userModel = require("../models/userModel");
require("dotenv").config();
const localStrategy = require("passport-local").Strategy;

var Jwtstrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// middleware to check users request contains token 
passport.use(new Jwtstrategy(
    {
        secretOrKey: process.env.JWT_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token")

    },
     async (token, done) => {
        try {
            return done(null, token.user)
        } catch (error) {
            console.log(err);
            return done(error);
        }
    }
))

// middleware for sign-up
passport.use("sign-up", new localStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            const user_type = req.body.user_type;
            const user = await userModel.create( {username, password, user_type} );
            return done(null, user)
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }
))


passport.use("login", new localStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    async (username, password, done) => {
        try {
            const user = await userModel.findOne({ username })
            if (!user) {
                return done(null, false, { message: "User not found" })
            }

            const validate = await user.isValidPassword(password);

            if(!validate) {
                return done(null, false, { message: "Incorrect password" })
            }

            return done(null, user, { messaage: "Logged in successsfully" })
        } catch (error) {
            console.log(error);
            return done(error);  
        }
    }
))