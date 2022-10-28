const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

async function validateToken(req, res, next){

    const authorizationHeader = req.headers.authorization;
    let result;

    if(!authorizationHeader) {
        return res.status(401).json({
            error: true,
            message: "Access token is missing",
        });
    }

    const token = authorizationHeader.split(".")[1];

    const options = {
        expiresIn: "24h"
    };

    try{
        let user = await userModel.findOne({ accessToken: token });

        if(!user){
            result = {
                error: true,
                message: "Authentication error"
            };

            return res.status(403).json(result);
        }

        result = jwt.verify(token, process.env.JWT_TOKEN || "something_secret", options);
        // !!!!!!!!!
        if(user.username !== result.username){
            result = {
                error: true,
                message: "Invalid token"
            };

            return res.status(401).json(result);
        }

        req.decoded = result;

        next();
    }
    catch(error){
        console.log(error);

        if(error.name === "TokenExpiredError") {
            return res.status(403).json({
                error: true,
                message: "Token expired"
            });
        }

        return res.status(403).json({
            error: true,
            message: "Authentication error"
        })
    }
}

module.exports = validateToken;