const express = require('express')
const userModel = require('../Model/userModel');
const userRoute = express.Router();



userRoute.get('/', async (req, res)=>{
    const users = await userModel.find()
    res.status(200).send(users)
})


userRoute.post("/", async (req, res)=>{
    const {username, password, usertype} = req.body;

    try {
        const user = await userModel.create({
            username: username,
            password: password,
            userType: usertype
        })
        res.status(201).send(user)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

userRoute.put("/:id", async (req, res) =>{
    const id = req.params.id;

    try {
        const updateUser = await userModel.findByIdAndUpdate(id, {$set:{
            username: req.body.username,
            password: req.body.password,
            userType: req.body.usertype,
        }},{
            new: true,
        })
        res.status(200).send(updateUser)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

userRoute.delete("/:id", async (req, res)=>{
    const id = req.params.id

    try {
        const deleteUser = await userModel.findByIdAndDelete(id)
        res.status(200).send("user deleted successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = userRoute