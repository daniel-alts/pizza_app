const express = require("express");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const Users = require('../models/userModel') // user model
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;


passport.use(
    new jwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: extractJwt.fromUrlQueryParameter('secret_token')
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
        async (email, password, done) => {
            try {
                const user = await Users.create({ email, password });

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
            usernameField: 'email',
            passwordField: 'password' 
            
        },
        async (email, password , done) => {
            try{
                const user = await Users.findOne({email});

                if(!user){
                    return done(null, false, {message : "user not found"});
                }

                const validatePassword = await user.isValidPassword(password);

                if(!validatePassword) {
                    return done( null, false, {message: "invalid password"});
                }

                return done (null, user , {message: "logged in successfully"});
            }
            catch(error) {
                return done(error);
            }
        }
    )
);