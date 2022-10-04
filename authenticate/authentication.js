
const express = require('express');
const userModel = require('../models/userModel');
const app = express();
app.use(express.json());


const authenticateUser = async (req, res, next) => {
   const userLogin = req.headers.authorization
 
   if (!userLogin){ 
      const err = res.status(401).json({message: "User not provided"})
      
      return (err)
  
   }
  const authSplit = new Buffer.from(userLogin.split(' ')[1], 'base64').toString('ascii').split(':');
   const user = authSplit[0]
   const pass = authSplit[1]
   
const userAuth = await userModel.find({username: user})

   if(user == userAuth.username && pass == userAuth.password){
      return 

   }
   else{
      const err = res.status(401).json({message: "Invalid user, enter valid username or password" })
     return (err)
   }
   
   
   
}




module.exports = {
   authenticateUser
}