const UserModel = require("../models/user")

async function getUsers(req,res,next){
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
  
}
async function getUserById(req,res,next){
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

}
async function addUser(req,res,next){
  const user = req.body
  console.log(user)

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
}
async function updateUser(req,res,next){
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
}
async function deleteUser(req,res,next){
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

}


module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}