/* eslint-disable no-undef */
const express = require('express');
const userModel = require('./userModel');
const moment = require('moment');


const app = express.Router();

app.post("/", async (req, res) => {
    const body = req.body;

    const user = await userModel.create({ 
        name: body.name,
        address: body.address,
        email: body.email,
        phone_number: body.phonum,
        password: body.password,
        created_at: moment().toDate(),
    })
    
    return res.json({ status: true, user })
})

app.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await userModel.findById(userId)
  
    if (!user) {
        return res.status(404).json({ status: false, user: null })
    }
    tempuser.password = undefined;

    return res.json({ status: true, user })
})

app.get("/users", async (req, res) => {
    const users = await userModel.find()

    return res.json({ status: true, users })
}) 
    
app.put("/:userId", async (req, res) => {
    const temp ={
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phonum,
        password: req.body.password, 
        _id: req.params.userId
        }
        let user = await new userModel(temp)
        
        const upUser = await user.save();
        upUser.password = undefined;
   
        res.json({ status: true, upUser})
        
    }
)

app.delete("/:userId")



         

module.exports = app;