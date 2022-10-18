const localStrategy = require('passport-local')
.Strategy
const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const passport = require('passport')

passport.serializeUser((user,done) =>{
    done(null, user.id)

})
passport.deserializeUser((id,done) =>{
    User.findById(id,(err, user) =>{
        done(err, user)
    })
    

})



passport.use(
    new localStrategy({usernameField:"email"}, (email, password, done) =>{
        User.findOne({email:email})
        .then(user =>{
            if(!user){
                const newUser = new User.findOne({email, password})
                bcrypt.genSalt(10, (err,salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err 
                        newUser.password = hash
                        newUser
                        .save()
                        .then(user =>{
                            return done(null, user)
                        })
                        .catch(err =>{
                            return done(null, false, {message: `user not found ${err}`})
                        })
                    })
                })
            }else{
                 bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(err) throw err

                    if(isMatch){
                        return done(null, user)
                    }else{
                        return done(null, false, { message: "no user found" })
                    }
                })
            }
        })
    })
)


module.exports = passport 