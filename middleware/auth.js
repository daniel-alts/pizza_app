const Users = require("../model/userModel")

const authtenticateUser =  async (req,res,next) =>{  
    let authheader = req.headers.authorization;
    
 
    if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send("You are not authenticated!")
    }
 
    let auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    const userName = auth[0];
    const password = auth[1];
    
    const Allusers = await Users.find()

    const User =   Allusers.find((user)=>user.UserName === userName && user.Password ===password )
    if (User) {
        
        next()
    } 

    else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send("You are not authenticated!")
    }
}

module.exports = authtenticateUser

