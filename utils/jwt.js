const jwt = require("jsonwebtoken");



const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWTSECRET, { 
        expiresIn: process.env.JWT_LIFETIME
    })
    return token 
}


const isTokenValid = ({token}) =>{
    jwt.verify(token, process.env.JWTSECRET)
}

module.exports = {
    createJWT,
    isTokenValid,
}
