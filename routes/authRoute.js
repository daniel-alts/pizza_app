const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.post('/signup', (req, res)=>{
    const user = {
        username : req.body.username,
        password: req.body.password,
        userType : req.body.userType
    };

    User.create(user).then((user)=>{
        res.status(201).send(user)
    }).catch((error)=>{
        res.status(500).send(error)
    });
})

router.post('/login', async (req,res)=>{
    const { username, password} = req.body;

    const user = await User.findOne({username})
    
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            try{
            const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
            return res.json({
                success: true,
                user: user,
                token: `Bearer ${token}`
            });
            }catch(err){
            return res.json({
                success: false,
                error: err
            })
            }

        } 
        return res.json({
                success: false,
                error: "incorrect password"
            })
    }
    return res.json({
        success: false,
        error: 'invalid user'
    })
})

module.exports = router;