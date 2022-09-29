const User = require("../models/userModel")

async function authenticate(authorization, req, res){
    if(!authorization){
        return res.send("Access Denied: Log in first")
    }
    const encoded = authorization.substring(6)
    const decoded = Buffer.from(encoded, "base64").toString("ascii")
    const [ username, password ] = decoded.split(":")
    const authenticatedUser = await User.findOne({
        $or: [{ username: username}, {email: username}]
    })
    if(!authenticatedUser){
        return res.send("you have to sign up")
    }
    if(authenticatedUser.password != password){
        return res.send("password incorrect")
    }
    return true;
}

module.exports = authenticate