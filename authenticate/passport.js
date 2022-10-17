const passport = require('passport')
const userModel = require('../models/userModel')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt


passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'a string',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        (jwt_payload, done) => {
            userModel.findOne({_id: jwt_payload.id}, (err, user) => {
                
                if(err){
                    return done(err, false)
                }
                if(user) {
                    return done(null, user)
                }
                else {
                    return done(null, false)
                }
            })
        }
           
        
    )
)
    



