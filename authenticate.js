const { userModel } = require('./models/userModel')

async function isAuthenticated(req, res, next) {
    if (req.method == "PATCH" || req.method == "DELETE") {
        if (user.user_type != "admin") {
            res.status(401).send("Unauthorized access")
            return
        }
    }

    res.locals.user = user
    next()
}

module.exports = isAuthenticated