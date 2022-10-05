const express =require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");


const getAllUsers = async(req, res) => {
    const users = await User.find()
    return res.status(200).json(users)
}



const createUser = async (req, res ) => {
    const body = req.body;
    // const user = await User.create()
    User.create(User)
    .then((user) => {
        res.status(201).send({
            message: "User added successfully",
            data: user  
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
}



const getUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId) 

    if (!user) {
        return res.status(404).json({ status: false, order: null })
    }
        return res.json({ status: true, order })
}



const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { state } = req.body;

    const user = await User.findById(userId)

    if (!user) {
    return res.status(404).json({ status: false, user: null })
    }

    if (state < user.state) {
    return res.status(422).json({ status: false, user: null, message: 'Invalid operation' })
    }

    user.state = state;

    await user.save() 

    return res.json({ status: true, user })
    }



    const deleteUser = async (req, res) => {
        const { userId } = req.params;
    
        const user = await User.deleteOne({ _id: userId})
    
        return res.json({ status: true, user }) 
    }
        





module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}