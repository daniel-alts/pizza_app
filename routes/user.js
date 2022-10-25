const express = require('express');
const { reset } = require('nodemon');
const users = require('../models/user');

const userRoute = express.Router();

//Create User
userRoute.post('/', async (req, res) => {
 const {username, password, user_type} = req.body;
 if (!(username || password)) {
  return res.status(400).send({
   message: "username and password needed!"
  })
 }

 try{
  const findUser = await users.find();
  const userFound = findUser.find((user) => user.username === username);
  if (userFound) {
   return res.status(409).send('User already exists');
  }
  const newUser = await users.create({
   username: username,
   password: password,
   user_type: user_type
  })

  res.status(201).send({Data: newUser})
 }
 catch(error){
  res.status(409).send(error.message)
 }
});

// Get all Users
userRoute.get('/users', async(req, res) => {
 const users = await users.find();

 if(!users) {
  return res.status(500).json({ status: false, users: null})
 }

 return res.json({ status: true, users})
})

module.exports = userRoute;