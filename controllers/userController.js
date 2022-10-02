const express = require("express")
const bcrypt = require('bcrypt');
const authenticateUser = require("../middleware/auth");
const User= require('../models/userModels');

const saltRounds = 10;

exports.register = async(req, res) => {
    try {
        let user = await User.findOne({
            username:req.body.username
           // password:req.body.password
        })
            if(user) {
                return res.status(400).send('User already exists. Kindly login')
            }
        const hashedPassword = await bcrypt.hash(req.body.password,saltRounds);
         user = new User.create({
            username: req.body.username,
            password: hashedPassword,
            user_type: req.body.user_type
        })
        await user.save()
        res.send("Registration Successful")
    } catch (error) {
        res.status(500).send("Internal Server Error occurred")
    }
}

exports.login = async(req, res) => {
    try {
        const{ username, password } = req.body
        const user = await User.findOne({ username: req.body.username })
        const hashedPassword = await bcrypt.hash(req.body.password,saltRounds);
        
        if (user) {
            const comparePwd = await bcrypt.compare(password, hashedPassword)
            if(comparePwd) {
                res.status(200).json(user)
            }
           // res.send("Invalid Details")
        } else if(!user){
            res.send("Wrong username or password.")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error occured")
    }
}


    exports.getAllUsers = async (req, res) => {
        try {
            //let id = {_id: req.param.id}
           //  const authUser = req.authUser 
         const user = await User.find({   })
             // if(!authUser.role !==)
              if (user == null ) {
                  return res.status(400).send("User not found!")
              } 
                  return res.status(200).json({
                    succes: true,
                    message:"user found!",
                    user,
                    
                })
              
      
        
      } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
      }
      }
          
    
    

exports.getUserbyId = async (req, res) => {
    try {
        let id = {_id: req.param.id}
      const user = await User.findOne({ id })
          
          if (user == null ) {
              return res.status(400).send("User not found!")
          } 
              return res.status(200).json({
                succes: true,
                message:"user found!",
                user
            })
          
  
    
  } catch (error) {
    console.log(error)
    res.catch(500).json({
        
        success: false,
        message: "Internal Server Error",
        error: error.message
    })
  }
  }
      

  
exports.updateUser = async (req, res) => {
    try {
        let id = {_id: req.params.id}
        let user = await req.body
      const update = await User.findOneAndUpdate( id, user, {new: true} )
          
          if (update == null ) {
              return res.status(400).send("User not updated!")
          } 
              return res.status(200).json({
                succes: true,
                message:"user updated Successfully!",
                user: update
            })
          
  
    
  } catch (error) {
    res.catch(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    })
  }
  }


  
exports.deleteUser = async (req, res) => {
    try {
        let id = {_id: req.params.id}
      let removeUser = await User.findOneAndRemove(id)
          
          if (removeUser == null ) {
              return res.status(400).send("User not deleted!")
          } 
              return res.status(200).json({
                succes: true,
                message:"Deleted!",

            })
          
  
    
  } catch (error) {
    res.catch(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    })
  }
  }
      
  
  
      


  
  