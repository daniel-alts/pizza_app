const express = require("express");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const userModel = require("../model/userModel");
<<<<<<< Updated upstream

dotenv.config();

const authenticate = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        let decoded;

        if (authorization) {
            try {
                const token = authorization.split(" ")[1];
                // ["bearer", "token"]
                decoded = jwt.verify(token, process.env.SECRET);
            } catch (error) {
                return res.status(410).json({
                    error: true,
                    message: "Session expired, you have to login.",
                });
            }
            req.decoded = decoded;
            return next();
        }
        return res.status(401).json({
            error: true,
            message: "Sorry, you have to login.",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server Error",
        });
    }
};

module.exports = authenticate;
=======
const dotenv = require("dotenv");
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// dotenv.config();
// const authenticate = (req, res, next) => {
//     try {
//         const { authorization } = req.headers;
//         let decoded;

//         if (authorization) {
//             try {
//                 const token = authorization.split(" ")[1];
//                 //["bearer", "token"]
//                 decoded = jwt.verify(token, process.env.SECRET);
//             } catch (error) {
//                 return res
//                     .status(410)
//                     .json({ error: true, message: "Session expired, you have to login" });
//             }
//             req.decoded = decoded;
//             return next();
//         }
//         return res
//             .status(401)
//             .json({ error: true, message: "Sorry you have to login" });
//     } catch (error) {
//         return res.status(500).json({ error: true, message: "Server error" });
//     }
// };
passport.use(
    new JWTstrategy({
            secretOrKey: process.env.JWT_SECRET,
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async(token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "signup",
    new localStrategy({
            usernameField: "email",
            passwordField: "password",
        },
        async(email, pasword, done) => {
            try {
                const user = await userModel.create({ email, password });
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new localStrategy({
            usernameField: "email",
            passwordField: "password",
        },
        async(email, password, done) => {
            try {
                const user = await userModel.findone({ email });
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, user, { message: "Wrong Password" });
                }
                return done(null, user, { message: "Logged in Successfuly" });
            } catch (error) {
                return done(error);
            }
        }
    )
);
>>>>>>> Stashed changes
