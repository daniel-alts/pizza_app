const express = require("express")
const userModel = require("../models/userModel")
const userRoute = express.Router()
// register admin

userRoute.post("/", async(req,res)=>{
    const {username, password, roles} = req.body

    if(!(username || password)){
        return res.status(400).send({message :"Username and password required"})
    }

    const user = await userModel.findOne({username})
    if(user){
        return res.status(400).send({message: "user already exist."})
    }

    const newUser = await userModel.create({username , password, roles})

    res.status(200).send({data: newUser})


})

userRoute.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const {password, roles} = req.body

    const user = await userModel.findById(id)

    if(!user){
        return res.status(404).send({status : false , msg: "user not found"})
    }
    
    if(password){
        user.password = password
    }
    if(roles){
        user.roles = roles
    }
    await user.save()
    .then((user)=>{
        return res.status(200).send({status: true, user})
    })
    .catch((err)=>{
        return res.status(500).sen({status: false,message :"internal server error"})
    })
    
})

userRoute.get('/', async (req, res) => {
    const allUsers = await userModel.find()

    return res.status(200).json({ status: true, allUsers })
})



module.exports = userRoute