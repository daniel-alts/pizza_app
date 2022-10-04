const userModel = require("../Models/userModel")
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

   return res.json({ status: true, users })
}

const deleteUser = async (req, res)=>{
  await authenticateRoute(req, res)
  const {id} = req.params 

  const user = await userModel.deleteOne({_id: id})
  
  return res.json({ status: true, user })
}

const updateUser = async (req, res)=>{
  await authenticateRoute(req, res)
  const { id } = req.params;
  const { state } = req.body;

  const user = await userModel.findById(id)

  if (!user) {
      return res.status(404).json({ status: false, order: null })
  }

  if (state < user.state) {
      return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
  }

  user.state = state;

  await user.save()

  return res.json({ status: true, user })
}

module.exports = {
  makeUser,
  getUserById,
  getUsers,
  deleteUser,
  updateUser
}