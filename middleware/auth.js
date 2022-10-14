const Users = require("../model/userModel")

const authtenticateUser =  async (req,res,next) =>{  
    let authheader = req.headers.authorization;
    
 
    if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send("You are not authenticated!")
    }
 
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  if(!b64auth) return res.status(401)
  const [userName, password] = Buffer.from(b64auth, 'base64').toString().split(':')

   const Allusers = await Users.find()

    const User =   Allusers.find((user)=>user.UserName === userName && user.Password ===password )
    if (User) {
        
     return  next()
    } 

    else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send("You are not authenticated!")
    }
}

module.exports = authtenticateUser

