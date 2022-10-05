const express = require("express")

const userRoute = express.Router()
const userModel = require("../model/userModel")


userRoute.get("/",(req, res)=>{
    userModel.find({}).then((users)=>{
        res.status(200).send({
            message: "users retrieved successfully",
            data: users
        })
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err.message)

    })
    

})

userRoute.get("/:id",async(req, res)=>{

})

userRoute.post("/",(req, res)=>{
    const user = req.body
     userModel.create(user).then((user)=>{
        res.status(201).send({
            message: "user created successfully",
            data: user
        })

     }).catch((err)=>{
        console.log(err)
        res.status(400).send(err)

     })
})

userRoute.delete("/:id",async(req, res)=>{

})
userRoute.put("/:id ",async(req, res)=>{

})

module.exports = userRoute