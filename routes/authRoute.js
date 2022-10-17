require("dotenv").config()
const { connectToMongoDb } = require('../database')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel');
const app = express()
connectToMongoDb();
app.use(express.json())

app.post('/register', async (req, res) => {
try{

const {username, email, password} = req.body
if (!(username && password || email && password)) {
 res.status(400).send("Input user details")
}

const existingUser = await userModel.findOne({email})
if (existingUser){
    return res.status(400).send("User already exists")
}

encryptPass = await bcrypt.hash(password, 10)
const newUser = await userModel.create({
    username,
    email: email.toLowerCase(),
    password: encryptPass
})
res.send(newUser)

} 
catch(err) {
    console.log(err)
}


})

app.post('/login', async (req, res) => {
const {username, email, password } = req.body
if(!(username && password || email  && password)){
    res.status(400).send("Please provide your login details")
}
try{
    const validUser = await userModel.findOne({email})
    if(!validUser){
        res.status(404).send("User does not exist. Please register")
    }
    
    const comparePass = await bcrypt.compare(password, validUser.password)
    if(!comparePass){
        res.status(400).send("Incorrect password")
    }

    const payload = {
        user: validUser.username,
        id: validUser
    }
    const token = jwt.sign(payload, 'a string', {expiresIn: '1d'})
    res.status(200).send({
        id: validUser._id,
        username: validUser.username,
        token: "Bearer" + " " + token
    })

} catch(err) {
    res.json({
        error:err
    })
}
})



module.exports = app