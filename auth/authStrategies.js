const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const localStrategy = require("passport-local");
const User = require("../userModel")

passport.use(
    new JWTStrategy({
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token);
        } catch (error) {
            done(error);
        }
    })
)

passport.use('signup',
            new localStrategy({
                usernameField: 'username',
                passwordField: 'password'
            },
            async (username, password, done) => {
                try {
                    const userExists = await User.findOne({username})
                    if (userExists) {
                        return done(null, false, {message: "User already exists"})
                    }
                    const user = await User.create({username, password});
                    done(null, user, {message: "User created successfully!"})
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            })
        )

passport.use('login',
              new localStrategy({
                usernameField: 'username',
                passwordField: 'password'
              },
              async (username, password, done) => {
                try {
                    const user = await User.findOne({username});
                    if (!user) {
                        return done(null, false, {message: "User not found"})
                    }

                    if (!await user.isValidPassword(password)) {
                        return done(null, false, {message: "Invalid password"})
                    }

                    done(null, true, {message: "Logged in successfully!"})
                } catch (error) {
                    console.log(error);
                    done(error);
                }
              })
        )