const express = require("express")
const moment = require('moment');
const userModel = require('../userModel');

const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
    const body = req.body;
    // res.send(body)

    const user = await userModel.create(body)
    
    return res.json({ status: true, user })
})

userRoute.post('/login', async (req, res) => {
    const user = req.body;

    const User = await userModel.findOne(user)

    if(!user) {
        return res.status(404).json({message: "Enter Username and Password"})
    }

    if (user.user.username === User.username){
        if (user.user.password === User.password){
            return res.send("welcome to your Dashboard")
        }
    }
    res.json({
        error: "Incorrect username or password"
    })
})


module.exports = userRoute