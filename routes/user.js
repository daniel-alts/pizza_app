const express = require("express");
const Users = require("../models/userModel");

const userRouter = express.Router();


//admin authentication function
const adminAuthenticated = (req , res , next)=>{
    const User = req.params.username
    const userId = req.params.userId
    const userPassword = req.params.password
    
     Users.findById(userId)
        .then((user) =>{
            console.log(user)
            if(user.username === User && user.password === userPassword && user.user_type === "admin"){
                next()
                
            }
            else{
                res.status(401)
            res.send({
                message:"unauthorized action"
            })
            }
        })
        .catch((err) =>{
            console.log(err)
        })
    
    console.log(userId)
 
}

const userAuthenticated = (req , res , next)=>{
    const User = req.params.username
    const userId = req.params.userid
    const userPassword = req.params.password

     Users.findById(userId)
        .then((user) =>{
            console.log(user)
            if(user.username === User && user.password === userPassword){
                next()
            }
            else{
                res.status(401)
            res.send({
                message:"unauthorized action"
            })
            }
        })
        .catch((err) =>{
            console.log(err)
        })
    console.log(User)
    console.log(userId)

    
  
}

//the only authoried user able to GET all users is the admin
userRouter.get("/", (req,res)=>{
    

    Users.find({})
        .then((users) =>{
            res.status(200)
            res.send(users)
            console.log(users)
        })
        .catch((err) =>{
            res.status(404)
            res.send({
                message:"An error occured"
            })
        })
} )

userRouter.get("/:userid/:username/:password", userAuthenticated, (req,res)=>{
    
    const userId = req.params.userid
    console.log(userId)

    Users.findById(userId)
        .then((user) =>{
            res.status(200)
            res.send(user)
            console.log(user)
        })
        .catch((err) =>{
            res.status(404)
            res.send({
                message:"An error occured"
            })
            
        })
} )

//every user is can create a document
userRouter.post("/:userid/:username/:password",userAuthenticated, (req,res) =>{
    const newUser = req.body

    Users.create(newUser)
        .then((newUser) =>{
            res.status(200)
            res.send(newUser)
        })
        .catch((err) =>{
            res.status(500)
            res.send({
                message:"An error occured"
            })
        })
})

userRouter.put("/:userid/:username/:password",userAuthenticated, (req,res) =>{
    const userId = req.params.id
    const updates = req.body

    Users.findOneAndUpdate(userId, updates, {new:true})
        .then((updates) =>{
            res.status(200)
            res.send(updates)
            console.log(updates)
        })
        .catch((err) =>{
            res.status(404)
            res.send({
                message:"An error occured"
            })
            
        })
} )

userRouter.delete("/:id/:userId/:username/:password",adminAuthenticated, (req,res) =>{
    const userId = req.params.id


    Users.findOneAndDelete(userId)
        .then((user) =>{
            res.status(200)
            res.send({
                message: "deletion sucessful",
                data: ""
            })
        })
        .catch((err) =>{
            res.status(404)
            res.send({
                message:"An error occured"
            })
            
        })
} )


module.exports = userRouter
