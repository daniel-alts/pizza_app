const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')


async function registerUser(req, res, next){
    try{
        const body = req.body;
    
        const user = await userModel.create({
        username: body.username,
        password: await bcrypt.hash(req.body.password, 8),
        user_type: body.user_type
        })

        res.status(200).send({
            username: user.username,
            role: user.user_type
        })
    } catch(err){
        next(err)
    }
    
}

async function loginUser(req, res, next){
    try {
      
        const user = await userModel.findOne( {username : req.body.username })

        if (user) {
          const password_valid = await bcrypt.compare(req.body.password,user.password);
          if(password_valid){

            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              user_type: user.user_type,
            });
          }
          else {
            res.status(400).send({ error : "Password Incorrect" });
          }
          
          }
          
      
        else{
          res.status(404).send({ error : "User does not exist" });
        }     

    } catch (err) {
        next(err)
      }

}

async function authenticateAdmin(req, res, next){
  try{
    const authorization = req.headers.authorization;

  if(!authorization){
    return res.status(403).send({message: 'Forbidden'})
  }

  const encoded = authorization.substring(6);
  const decoded = Buffer.from(encoded, 'base64').toString('ascii');
  const [username, password] = decoded.split(':')
  const authenticatedUser = await userModel.findOne({username})
  if(!authenticatedUser){
    return res.status(403).send({message: 'Forbidden'})
  }

  const matchDetails = authenticatedUser.password === password ? true : false

  if(matchDetails){
    req.authenticatedUser = {
      username: authenticatedUser.username,
      role: authenticatedUser.user_type
    }
  }
  if(authenticatedUser.user_type !== 'admin'){
    return res.status(401).send({message: 'Unauthorized'})

  }
  next()
  
  } catch(err){
    next(err)
  }
}

  async function authenticateUser(req, res, next){
    try{
      const authorization = req.headers.authorization;
  
    if(!authorization){
      return res.status(403).send({message: 'Forbidden'})
    }
  
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    const [username, password] = decoded.split(':')
    const authenticatedUser = await userModel.findOne({username})
    if(!authenticatedUser){
      return res.status(403).send({message: 'Forbidden'})
    }
  
    const matchDetails = authenticatedUser.password === password ? true : false
  
    if(matchDetails){
      req.authenticatedUser = {
        username: authenticatedUser.username,
        role: authenticatedUser.user_type
      }
    }
    if(authenticatedUser.user_type === 'user' || authenticatedUser.user_type === 'admin'){
      
      next()
    }
    else{
      return res.status(401).send({message: 'Unauthorized'})
    }
    
    } catch(err){
      next(err)
    }
  
  
}


module.exports = {
    registerUser,
    loginUser,
    authenticateAdmin,
    authenticateUser
}