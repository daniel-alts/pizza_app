const express = require("express")
const bcrypt = require('bcryptjs');
const authenticateUser = require("../middleware/auth");
const User= require('../models/userModels');




exports.register = async (req, res) => {

    try {
        let user = await User.findOne({
            username:req.body.username,
            password:req.body.password
        })
            if(user) {
                return res.status(400).send('User already exists. Kindly login')
            } else {
                user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    user_type: req.body.user_type
                })
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt)
                await user.save()
                res.send('Registration successfullly')

            }
        

    } catch (error) {
        //console.log(error)
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
  try {
    const{ username, password } = req.body
    const user = await User.findOne({ username })
        
        if (username == null ) {
            return res.status(400).send("All input is required")
        } else if(user && (await bcrypt.compare(password, user.password))) {
           
            return res.status(200).json(user)
        }
         res.status(400).send("Invalid details")


  
} catch (error) {
        console.log(error)
    }
}
    
