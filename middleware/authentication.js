const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {UnauthenticadError} = require("../errors")

const auth = async (req,res, next) => {
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticadError("Authentication invalid")
    }
    const token = authHeader.split(" ")[1]

    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to the job routes
        req.user = {userId: payLoad.userId, username:payLoad.username, user_type:payLoad.user_type}
        next()
    }catch (error) {
        throw new UnauthenticadError("Authentication invalid")
    }
}

module.exports = auth;