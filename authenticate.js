const { userModel } = require("./models/userModel");

async function authenticated(req, res, next) {
    let loginDetails = req.headers.authorization;
    let [, username, password ] = loginDetails;
    let user = await userModel.findOne({username, password});

    if (!user) {
        res.status(401).send('Please sign up');
        return
    }
    
    if (req.method === "PATH" || req.method === "DELETE") {
        if (user.user_type != "admin") {
            res.status(401).send("Unauthorized access")
            return
        }
    }
    
        res.locals.user = user;
        next();
    }


module.exports = authenticated