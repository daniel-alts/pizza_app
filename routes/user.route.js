const express = require('express')

const UserModel = require('../models/user')

const userRoute = express.Router()

userRoute.get("/", (req, res)=>{
  UserModel.find({})
    .then((user)=>{
      res.status(200).json({
        status:true,
        message:'Users gotten',
        data:user
      })
    }).catch((err)=>{
      console.log(err)
      res.status(500).send(err)
    })

})
userRoute.get("/:id", (req, res)=>{
  const id = req.params.id 
  UserModel.findById(id).
    then( user =>{
      res.status(200).json({
        status:true,
        data:user
      })
    }).catch((err)=>{
      console.log(err)
      res.status(500).send(err)
    })

})

userRoute.post("/", (req, res)=>{
  const user = req.body

  UserModel.create(user)
    .then(user =>{
      res.status(201).json({
        status:true,
        message:'User added',
        data: user
      })
    }).catch(err => {
      console.log(err)
      res.status(400).send(err)    
    })
})
userRoute.patch("/:id", (req, res)=>{
  const id = req.params.id 
  const user = req.body
  UserModel.findByIdAndUpdate(id, user,  {new: true})
    .then(user => {
      res.status(201).json({
        status:true,
        message:'User updated',
        data: user
      })
    }).catch(err => {
      console.log(err)
      res.status(400).send(err)
    })

})
userRoute.delete("/:id", (req, res)=>{
  const id = req.params.id 
  UserModel.findByIdAndDelete(id,)
  .then(user => {
    res.status(201).json({
      status:true,
      message:'User deleted',
      data: user
    })
  }).catch(err => {
    console.log(err)
    res.status(400).send(err)
  })

})

module.exports = userRoute