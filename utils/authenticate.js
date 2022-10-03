const db = require('../models/model');

const userModel = db.User

const authenticate = async (req, res, next) => {
  // get basic authentication from header
  // const authorization = req.headers
  // console.log(authorization)
  const authorization = req.headers.authorization;
  try {
    if (authorization) {
      // console.log(authorization2)
      const encoded = authorization.split(" ")[1]
      // console.log(encoded)
      const decoded = Buffer.from(encoded, 'base64').toString('ascii');
      // console.log(decoded)
      const [username, password] = decoded.split(':')
      // console.log(password)
      const authenticateUser = await userModel.findOne({ username });
      // console.log(authenticatedUser.password)
      const match = password === authenticateUser.password
      // console.log(authenticatedUser.userType)
      if (match){
        req.authenticateUser = {
          username: authenticateUser.username,
          role: authenticateUser.userType,
        }
      }
      
    }
    next()
  } catch (err) {
    next()
  }
}


module.exports = authenticate;