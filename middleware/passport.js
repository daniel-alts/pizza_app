const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')



//Load User model
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.userId}, function(err, user) {
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


passport.use(
    'login',
    new LocalStrategy(
        async (username, password, done) => {
            try {
                //login user 
                    if(!username || !password) return done(null, false, {message: 'username and password cannot be empty'})
                    const user = await User.findOne({username});
                    if(!user) return done(null, false, {message: 'user does not exist'})
                    const isPasswordCorrect = user.comparePasswords(password)
                    if (!isPasswordCorrect) return done(null, false, {message: 'Incorrect password'})
                    token = user.createJWT();
                    return done(null, {user, token: token}) 
            } catch (error) {
                return done(error)
            }
}))


passport.use(
    'signup',
    new LocalStrategy(
        {passReqToCallback: true},
        async (req, username, password, done) => {
            try {
                //register user 
                    if(!username || !password) return done(null, false, {message: 'username and password cannot be empty'})
                    const user = await User.create({ ...req.body })
                    console.log(user)
                    token = user.createJWT();
                    return done(null, {user, token: token}) 
            } catch (error) {
                return done(error)
            }
}))