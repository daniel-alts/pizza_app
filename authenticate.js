const { userModel } = require('./models/userModel')

async function isAuthenticated(req, res, next) {
    let authDetail = req.headers.authentication.split(" ")
    let [ , username, password, email] = authDetail
    let user = await userModel.findOne({username, password, email})

    if (!user) {
        res.status(401).send("Unauthorized access")
        return
    }

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