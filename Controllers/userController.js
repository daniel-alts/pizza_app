const userModel = require("../Models/userModel")
const moment = require('moment')
const {authenticateRoute} = require("../Middleware/authentication")

const makeUser = async (req, res)=>{
  await authenticateRoute(req, res)
  const body = req.body

  const user = await userModel.create({
    username: body.username, 
    password: body.password,
    user_type: body.user_type
  })
  
  return res.json({status: true, user})
}

const getUserById = async (req, res)=>{
  await authenticateRoute(req, res)
  const {userId} = req.params

  const user = await userModel.findById(userId)

  if (!user) {
    return res.status(404).json({ status: false, order: null })
}
  return res.json({status: true, user})
}

const getUsers = async (req, res)=>{
  await authenticateRoute(req, res)

  const users = await userModel.find()

  return res.json({status: true, users})
}


module.exports = {
  makeUser,
  getUserById,
  getUsers
}