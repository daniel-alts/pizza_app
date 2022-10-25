const express = require("express")
const router = express.Router()
const cryptoJs = require("crypto-js")

const User = require('./userModel.js');

router.get("/usertest", (req, res)=>{

 res.json({"message" : "User route"})
 console.log("user route")

})

router.post("/user", (req, res)=>{
 const username = req.body.username
 console.log("your username is" + username)
})
// BASIC AUTHENTICATION( REGISTER AND LOGIN)

//REGISTER USER & ENCRYPT PASSWORD
router.post("/register", async (req,res)=>{
 const newUser = new User (
 {
     username : req.body.username,
     password : cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString(),
     email : req.body. email,
 })

 try
  {
    const savedUser = await newUser.save()
    console.log(savedUser)
    res.status(200).json(savedUser)  
  }catch(err)
  {
    console.log(err)
    res.status(500).json(err)
  }
})




// LOGIN

router.post("/login", async (req, res)=>{
  
 try{
        const registeredUser = await User.findOne(
         {username: req.body.username}   
        )
        console.log(registeredUser)
       if(!registeredUser){

         res.status(400).json("wrong username")
         
        }

        //DECRYPT PASSWORD
        const decryptPassword = cryptoJs.AES.decrypt(
            registeredUser.password, 
            process.env.PASS_SEC_KEY
        );
            
        const password = decryptPassword.toString(cryptoJs.enc.Utf8)

        password !== req.body.password && res.status(400).json("Wrong password")

        res.status(200).json(registeredUser)


    }catch(err) {res.status(401).json(err)}
})


module.exports = router
