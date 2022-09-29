// const mongoose = require("mongoose");
const userModel = require("../models/users")
const addUser = async (req, res, next) => {
  try {
    const users = await userModel.find();
    const userCreated = req.body;
    
    const userindex = users.findIndex(user => user.username === userCreated.username)
    if(userindex > -1){
      return res.status(404).send({
        message: "user already exist,try log in",
        status: false
      })
    }
    const user = await userModel.create(userCreated)
    return res.status(200).json({
        status: true,
        user
    })

    
  } catch (error) {
    error.message = "invalid connection"
    error.status = 404
    next(error)
  }
};

const getUser = async (req, res,next) => {
  try {
    const {username,password} = req.body
    const users = await userModel.find();

    const user = users.find(user => user.username == username && user.password == password)
    if(!user){
      return res.status(404).json({ status: false, message: "user is not found, try create user" });
    }
    return res.status(200).json({ status: true, user });
  } catch (error) {
    error.message = "invalid connection"
    error.status = 404
    next(error)
  }
};

module.exports = {
  addUser,
  getUser
};
