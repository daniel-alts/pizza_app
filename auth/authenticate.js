const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const userModel = require("../models/userModel")
require('dotenv').config()


exports.generateToken = function (user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: 3600 })
}

let opt = {}
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opt.secretOrKey = process.env.SECRET

exports.jwtPassport = passport.use(new JwtStrategy(opt, (jwt_payload, done) => {
    userModel.findOne({ id: jwt_payload.id }, (err, user) => {
        if (err) {
            return done(err, false)
        }
        else if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
}))
exports.verifyUser = passport.authenticate('jwt', { session: false })
