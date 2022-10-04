const express = require('express')
const router = express.Router()
const UserModel = require("../UserModel")
const auth = require("basic-auth")

router.get("/", (req,res)=>{
  res.status(200).send("Users only")
})

router.post("/create", async (req,res)=>{
  const {username, password} = req.body
  const findUser = await UserModel.findOne({username})
  if( !password){
      res.status(401).send("Please enter password")
    }else if( !username){
        res.status(401).send("Please provide your intended username")
      }
        else if( findUser ){
          res.status(401).send("User already exists, Please create a new user")
        }else{
          UserModel.create({
            username,
            password
          }).then(
            res.status(200).send("New user created")
          ).catch(err=>{
            res.status(400).send({message: err.message})
          })
            
          }
        })

        router.post("/login", async (req,res)=>{
          const {username, password} = req.body
          const finduser = await UserModel.findOne({ username, password})
          .then(result=>{
              res.setHeader('WWW-Authenticate', "Basic")
              res.status(200).send("Logged in successfully")
          })
          .catch(err=>{
            console.log(err.message)
            res.status(404).send("Email or Password not found")
})

router.delete("/:id", async (req,res)=>{
  const id = req.params.id;
  const user = await UserModel.deleteOne({id})
  .then(result=>{
    console.log(result)
    res.status(500).send(" User successfully deleted")
  })
  .catch(err=>{
    res.status(404).send({
      message: "User not found"
    })
  })
})
})


module.exports = router
