require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/userModel');
const passport = require('passport');

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function (jwt_payload,done){
            User.findOne({id: jwt_payload._id}, function(err, user){
                if (err){
                    return done (err, false);
                }
                if (user) {
                    return done(null, user);
                }else{
                    return done(null, false)
                }
            })
        }
    )
)