const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../userModel');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async(req, res, next) => {
    const body = req.body;
    const { username, password } = body;
    if(!username && !password){
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
        return;
    }
    const user = await userModel.findOne({ username, password })
    if(user){
        next()
    }else{
        res.status(401).send({
            statusCode: 401,
            message: "Unauthenticated"
        });
    }
}

const jwtAuth = async(req, res, next) => {
    // passport.authenticate('jwt', { session: false })
    // next()
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = JWT_SECRET;
    console.log(opts.jwtFromRequest())
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload)
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
module.exports = {auth, jwtAuth};