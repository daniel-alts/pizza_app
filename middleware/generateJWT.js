const jwt = require('jsonwebtoken');


const options = {
    expiresIn: "24h",
};

async function generateJWT(username){
    try{
        const payload = { username };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'something_secret', options);
        
        res.headers.authorization = token;
        return { error: false, token };
    }
    catch(error){
        return {error};
    }
}

module.exports = generateJWT;