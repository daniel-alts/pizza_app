const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const authenticatedUser = require('../middleware/authenticate')
// const jwt = require('jsonwebtoken');



const register = async(req, res, next) =>{
    try {
        const { username, password, user_type } = req.body

        const hashedPassword = await bcrypt.hash(password, 6)
        
        const userObject = {
          username,
          password: hashedPassword,
        } 
        if(user_type){
            userObject.user_type = user_type
        }
     

        const user = await User.create(userObject)

        .then((result) => {
        const { _id, username, user_type } = result

        const savedUserObject = {
          _id,
          username,
          user_type,
        }
        return res.status(201).json({ status: true, data: savedUserObject })
      })
    } catch (error) {
        res.status(400)
        next(error)
        
    }
}



module.exports = register;