
const express = require('express');
const authModel = require('./model/userModel');
const app = express();
app.use(express.json());


const authenticateUser = async (req, res,  ) => {
   const authUser = req.headers.authorization
  
   if (!authUser){ 
      res.send("Unathorized user")
      return
   }
   
 const authSplit = new Buffer.from(authUser.split(' ')[1], 'base64').toString().split(':');
   const user = authSplit[0]
   const pass = authSplit[1]
     
const modelDb = await authModel.find({})
 .then((modelDb) => {
   if (user.includes(modelDb.username) && pass.includes(modelDb.password)){
console.log(user, pass)
 }
}).catch((err) => {
   res.status(404).send({
       message:"orderId not found",
       data: err
   })
})
}



module.exports = {
   authenticateUser
}