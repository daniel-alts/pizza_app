/* eslint-disable no-undef */
const express = require('express');
const orderRouter = require('./order.controller');
const userModel = require('../models/userModel');
// const moment = require('moment');


const app = express.Router();

app.use("/:userId/orders", orderRouter)

app.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const tempuser = await userModel.findById(userId)
  
    if (!tempuser) {
        return res.status(404).json({ status: false, user: null })
    }
    tempuser.password = undefined;

    return res.json({ status: true, tempuser })
})

app.get("/", async (req, res) => {
    const users = await userModel.find({}, {password: 0})
    
    return res.json({ status: true, users })
}) 
    
app.put("/:userId", async (req, res) => {
    console
    let userId = req.params.userId
   if (req.user._id !== userId) {
        return res.status(401).json({message: "unauthorized"})
   }

    const temp ={
        name: req.body.name,
        address: req.body.address,
        email: req.body.username,
        phone_number: req.body.phonum,
        password: req.body.password, 
      
        }
        let user = await userModel.findByIdAndUpdate(userId,temp, {new: true})
        user.password = undefined;
        res.json({ status: true, user})
        
    }
)

app.delete("/:userId", async (req, res) => {
    const { userId } = req.params;

    const user = await userModel.deleteOne({ _id: userId})

    return res.json({ status: true, user })
})


app.use('/orders', orderRouter)


module.exports = app;