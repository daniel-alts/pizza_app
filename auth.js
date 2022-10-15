/* eslint-disable no-undef */
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
    secretOrKey: "0bGA7gaJaLgBcVssydy0IeAuYDehHGeyZxuTvcdCVBnMd54SXwPdg"
}

passport.use(
    new JwtStrategy(options,async function(token, done) {
       try {
           return done(null, token.user);
       } catch (error) {
           done(error);
       }
    })
)

passport.use(
    'signup', 
    new localStrategy(
        {
            usernameFields: 'username',
            passwordFields: 'password',
            passReqToCallback: true
        },
        async (req,username, password,done) => {
            let name = req.body.name;
            let address = req.body.address;
            let phonum = req.body.phonum
            try {
                const user = await UserModel.create({email : username, password,name,address, phone_number : phonum});
                return done(null,  user)
            } catch (error) {
                console.log(error)
                done(error)
            }
        }
    )
)

passport.use(
    'login', 
    new localStrategy(
        {
            usernameFields: 'username',
            passwordFields: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({email: username });
                if (!user) {
                    return done(null, false, {message: "user not found"});
                } 
              
                const validate = await user.isValidPassword(password);

                if(!validate) {
                    return done(null, false, { message: 'Wrong password'});
                }
              
                return done(null, user, {message: 'Logged In Successfully'});
            } catch (error) {
                return done(error);
            }
        }
    ))
