const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors")

const auth = async (req,res, next) => {
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError("Authentication invalid")
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token, process.env.JWTSECRET)
    
        const user = await User.findOne({_id: decoded._id})
        if(!user){
            throw new UnauthenticatedError("Invalid user...")
        }

        req.user = user
        req.token = token

        next()
    }catch(error){
        throw new UnauthenticatedError("Authentication invalid")
    }
}

module.exports = auth;