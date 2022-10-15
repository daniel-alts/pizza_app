const express = require("express");
const Users = require("../models/userModel");

const userRouter = express.Router();




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

userRouter.get("/:userid", (req,res)=>{
    
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
userRouter.post("/", (req,res) =>{
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

userRouter.put("/:userid", (req,res) =>{
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

userRouter.delete("/:userId", (req,res) =>{
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
