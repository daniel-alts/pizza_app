const userModel = require('../userModel');

const auth = async(req, res, next) => {
    const body = req.body;
    const { username, password } = body;
    if(!username && !password){
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
        return;
    }
    const user = await userModel.findOne({ username, password })
    if(user){
        next()
    }else{
        res.status(401).send({
            statusCode: 401,
            message: "Unauthenticated"
        });
    }
}

module.exports = auth;