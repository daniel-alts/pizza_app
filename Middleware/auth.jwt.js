const passport = require('passport')



const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

passport.use(
    new jwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
        },
        async(token, done)=>{
            try {
                return done(null, token.user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

