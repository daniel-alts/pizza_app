const User = require('../model/usermodel');

const authuser = async(req,res,next) => {
    let authheader = req.headers.authorization;
    if(!authheader) {
        res.setHeader('WWW-Authenticate','Basic');
        res.status(401).json({message:'you are not authorized'});
    }

    let auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
    const userName = auth[0];
    const password = auth[1];

    const allUsers = await User.find();
    const users = allUsers.find((user) => user.username === userName && user.password === password);
    if(user) {
        next()
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).json({message:'you are not authorized'});
    }   
} 

module.exports = authuser;
