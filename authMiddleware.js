const passport = require("passport");
const userModel = require("./models/users");
const localStrategy = require("passport-local").Strategy;



var Jwtstrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

require("dotenv").config();

// A middleware to check is a users request contains a token and to use the secretorkey to encrypt the token if available. If a token is confirmed to be available it the returns the users request.
passport.use(new Jwtstrategy(
    {
        secretOrKey: process.env.SECRET_KEY,
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

// A middleware for sign-up, this is called when the user goes to the /sign-up route
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