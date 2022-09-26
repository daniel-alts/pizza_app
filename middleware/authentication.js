require('dotenv').config()

const TOKEN = process.env.TOKEN

function authenticate(req, res, next) {
  const auth = req.headers.authorization
  try {
      if(!auth){
        throw ('Unauthorized!!, please log in or sign up before you continue')
    }
    const token = auth.split(' ')[1]
    if(token !== TOKEN){
        throw ('Please enter a valid token')
      }
      next();
    } catch (error) {
    res.status(401).send(error)
  }

}


module.exports = {authenticate}