const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

async function createUser(req,res){
    const body = req.body
    const password = req.body.password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = {firstName: req.body.firstName, lastName:req.body.lastName, username:req.body.username, password: hashedPassword, user_type: req.body.user_type}
    await userModel.create(user).then(()=>{
        res.status(201).send(user)
    })
   .catch((err)=>{
    res.status(500).send(err)
   })
}

async function getUsers(req,res){
    const users = await userModel.find()
    res.status(200).send(users)
}

async function deleteUserById(req,res){
    const id = req.params.id
    await userModel.findByIdAndDelete(id).then(()=>{
        res.status(200).send({
            message:'User Deleted Successfully'
        })
    }).catch((err)=>{
        res.status(500).send(err)
    })
}

module.exports = {createUser, getUsers, deleteUserById}