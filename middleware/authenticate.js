const User = require('../models/userModel')

const bcrypt = require('bcrypt')

const authentication = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  
  try {

  if(authHeader){
    const encoded = authHeader.substring(6)
    //decode encrypted, to unveil username/password
    const decoded = Buffer.from(encoded, 'base64').toString('ascii')

    //array deconstructing
    const [username, password] = decoded.split(':')

    // get the user.username object from DB
    const authenticatedUser = await User.findOne({ username })
  // compare the password for a match
  const isPasswordCorrect = await bcrypt.compare(password, authenticatedUser.password)
    
  // if successful store the data as a request object
  if(isPasswordCorrect){
    req.authenticatedUser = {
      username: authenticatedUser.username,
      user_type: authenticatedUser.user_type
  }
    
  } 
  }
  next()
  }catch (error) {
    res.status(401).send('Invalid Authentication')
    next(error)
  }
} 

module.exports = authentication;
