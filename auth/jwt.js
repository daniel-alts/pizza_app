const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt

passport.use(new JWTStrategy(
    {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }, (payload, done) => {
        
    }
))