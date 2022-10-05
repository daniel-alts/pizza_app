const User = require("../models/userModel")
const errorHandler = require("./error");

async function authenticate(authorization, req, res){
    
    if(!authorization){
            throw new Error(404, "provide username and password")
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
}

module.exports = authenticate