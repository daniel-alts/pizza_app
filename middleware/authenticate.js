const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization
   
    try {
      if (authorization) {
        // remove "Basic "
        const encoded = authorization.split(' ')[1]

        // decode to get username and password as plain text
        const credentials  = Buffer.from(encoded, 'base64').toString('ascii')
       
        const [username, password] = credentials .split(':')
        // get the user object from database
        const authenticatedUser = await userModel.findOne({ username })
        
        // compare the password
        const match = await bcrypt.compare(password, authenticatedUser.password)
        // if successful, store the details in the request
        if (match) {
          req.authenticatedUser = {
            username: authenticatedUser.username,
            role: authenticatedUser.user_type,
          }
        }
      }
      next()
    } catch (err) {
      next()
    }
};
