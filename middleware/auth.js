const jwt = require("jsonwebtoken")
require("dotenv").config()

const tokenKey = process.env.TOKEN_KEY

const authenticateUser = (req, res, next) =>{
    const token = req.query.token || req.headers["x-access-token"]

    if(!token){
        return res.status(403).send("Token not found, Athentication failled")
    }

    try{
        const decoded = jwt.verify(token, tokenKey)
        req.user = decoded
        console.log(decoded)
    }catch(err){
        return res.status(403).send("Invalid token")
    }
    return next()
}

module.exports = authenticateUser