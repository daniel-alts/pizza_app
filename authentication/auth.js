
//const express = require("express");
//const mongoose = require("mongoose");
const { serializeUser } = require("passport");
const passport = require("passport");
const { Strategy } = require("passport-jwt");
const localStrategy = require("passport-local").Strategy
const userModel = require("../models/userModel")
require("dotenv").config();

const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt


passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
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

//create the signup middleware

passport.use(
    "signup",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try{
                const user = userModel.create({
                    email,
                    password,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    date_Of_Birth: req.body.date_Of_Birth,
                    userType: req.body.userType
                })
                return done(null, user);
            }catch(error){
                return(error);
            }

        }
    )
);

//create the login middleware

passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },

        async (email, password, done)=>{
            try{
                const user = await userModel.findOne({email});
                if(!user){
                    return done(null, false, {message: "user not found"});
                }
                const validate = await user.isValidPassword(password);
                if(!validate){
                    return done(null, false, {message: "incorrect Password"});
                }
                return done(null, user, {message: "Logged in Succesfully"});
            }catch(error){
                return(error);
            }

        }

    )
);





