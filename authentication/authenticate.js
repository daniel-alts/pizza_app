const passport = require('passport');

const UserModel = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// //jwt strategy

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
             UserModel.findOne({id : jwt_payload.id}, (err, user) =>{
                if(err){
                    return done(err, false)
                }
                if(user){
                    return done(null, user)
                }else{
                    return done(null, false)
                }
            } )      
   
}))
