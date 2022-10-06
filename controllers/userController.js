// const express =require("express");
// const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt")

const getAllUsers = async(req, res) => {
    const users = await User.find()
    return res.status(200).json(users)
}



const createUser = async (req, res) => {
    try {
      const { username, password, email, user_type } = req.body
      const hashedPassword = await bcrypt.hash(password, 6)
      const userObject = {
        username,
        password: hashedPassword,
        email,
      }
      if (user_type) userObject.user_type = user_type
      const user = new User(userObject)
      user
        .save()
        .then((result) => {
          const { id, username, email, user_type } = result
          const returnObj = {
            id,
            username,
            email,
            user_type,
          }
          return res.status(201).json({ status: true, data: returnObj })
        })
        .catch((err) => {
          console.log('error occured', err)
          return res.status(400).json({ status: false, message: err.message })
        })
    } catch (err) {
      res.json(err)
    }
  }
  





module.exports = {
    getAllUsers,
    createUser,
}