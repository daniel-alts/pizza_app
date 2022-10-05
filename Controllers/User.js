// ********************IMPORT DEPENDENCIES AND CREATE CONTROLLER FUNCTIONS ************//

const UserModel = require('../model/usersModel')


// ********************* ADD A USER *********************//

async function createUser(req, res){
  const userInfo = req.body
  const user = await UserModel.create(userInfo)
  user.save()
  res.status(200).json({
    status: 'success'
  })
}

// ************GET A USER ******************//

async function getUsers(req, res){
  const users = await UserModel.find()
  res.status(200).json({
    status: 'success',
    data:users[0].userName
  })
}


//********************* AUTHENTICATE A USER *********************//

async function authenticateUser(req, res, next){
  let authHeader = await req.headers.authorization

  //******************check headers for authorization value *****************//
  if(!authHeader){
   let error = new Error('You are not authenticated!')
   res.status(401).json({
    status: 'Failed',
    message: 'Unauthorized!', error
   })
   return next(error)
  }

// ****************GET USERNAME AND PASSWORD FROM HEADER *******************//

  let userAuth =  new Buffer.from(authHeader.split(" ")[1]).toString().split(":");
  let username = userAuth[0],
 
  password = userAuth[1];
  let user = await UserModel.findOne({
    userName: username,
    password: password
  })
  let userFound= (user)? next() : next(new Error('Wrong username or password'));
 
}
module.exports = {
    createUser,
    getUsers,
    authenticateUser
}