const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const { userModel } = require('../models/userModel')

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
    
        async function (req, email, password, done) {
            try {
                const countUsers = await userModel.count({})
                
                const userInfo = req.body
                console.log(userInfo)
                if (countUsers == 0) userInfo._id = 1
                else userInfo._id = countUsers + 1

                const {_id, username, user_type} = userInfo

                const user = await userModel.create({_id, username, user_type, email, password})

                return done(null, user)
            } catch(err) {
                done(err)
            }
        }
    )
)