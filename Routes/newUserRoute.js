const express = require("express")
const userModel = require("../Models/userModel")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const userRoute = express.Router()
userRoute.use(express.json())

userRoute.get("/:userId", authenticateToken, async (req, res)=>{
  const {userId} = req.params
  const user = await userModel.findById(userId)
})

userRoute.post("/signup", async (req, res) => {
try{
  const body = req.body 
  const hashedPassword = await bycrypt.hash(body.password, 10)
 
  const user = await userModel.create({
    username: body.username, 
    password: hashedPassword,
    user_type: body.user_type
  })

  res.status(201)
  res.json({status: true, user})
} catch{
  res.status(500).send("Error in creating user")
}

})

userRoute.post("/login/:userId", async (req, res) => {
  const {userId} = req.params
  const user = await userModel.findById(userId)
  
  if(user == null){
    res.send("User not found")
  }
  
  if(await bycrypt.compare(req.body.password, user.password)) {
    const SECRET_KEY = process.env.SECRET_KEY
    const accessToken = jwt.sign(user.toJSON(), SECRET_KEY)
    res.json({status: true, accessToken })
  } else{
    res.json({error: "there was an error"})
  }
})


 function authenticateToken(req, res, next){
  const authHeader = req.headers.authorization 
  const token = authHeader.split(" ")[1]

  if(token == null){
    res.send("There was an error in verifying token")
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
    if(err){
      return res.status(501)
    }
    next()
  })
}

module.exports = userRoute
