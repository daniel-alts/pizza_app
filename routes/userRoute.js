const express = require('express')
const userModel = require('../models/userModel')
const server = express.Router()


server.post('/register', async(req, res)=>{
        const body = req.body
        const user = await userModel.create(body)
        res.json({user})
        
})

server.get('/login', async (req, res) =>{
        const body = req.body
        const user = await userModel.find({username: body.username, password: body.password})
        console.log(user)
        if(user.length == 0){
            res.send('wrong username or password')
        }else{
            res.send('login successful')
        }
})

module.exports = server