const express = require("express")
const authRouter = express.Router()
const cryptoJs = require("crypto-js")
const userAuthController = require("../controller/userAuthController")


const User = require('../model/userModel.js');

//REGISTER USER
authRouter.post("/register", userAuthController)

// LOGIN

// router.post("/login", async (req, res)=>{
  
//  try{
//         const registeredUser = await User.findOne(
//          {username: req.body.username}   
//         )
//         console.log(registeredUser)
//        if(!registeredUser){

//          res.status(400).json("wrong username")
         
//         }

//         //DECRYPT PASSWORD
//         const decryptPassword = cryptoJs.AES.decrypt(
//             registeredUser.password, 
//             process.env.PASS_SEC_KEY
//         );
            
//         const password = decryptPassword.toString(cryptoJs.enc.Utf8)

//         password !== req.body.password && res.status(400).json("Wrong password")

//         res.status(200).json(registeredUser)


//     }catch(err) {res.status(401).json(err)}
// })


module.exports = authRouter
