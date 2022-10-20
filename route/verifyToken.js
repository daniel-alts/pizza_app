const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT_SECRET_KEY, (err, user)=>{
            if(err)
            res.status(403).json("Invalid Token!");
            req.user = user;
            next();
        })

    } else {
        return res.status(401).json("You are not authenticated!")
    }
};

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not permitted!")
        }
    });
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not permitted!")
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};