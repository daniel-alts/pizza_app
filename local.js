const passport = require('passport');
const { LocalStrategy } = require("passport-local-mongoose")
const UserModel = require("./models/UserModel")

const local = passport.use(new LocalStrategy(
    function (username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err) }
            if (!user) { return done(null, false) }
            if (!user, verifyPassword(password)) { return done(null, false) }
            return done(null, user)
        })
    }
))

module.exports = local