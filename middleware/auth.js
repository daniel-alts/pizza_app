const UserModel = require("../models/userModels");
const User = require("../controllers/userController")
const userModel = require("../models/userModels")
const bcrypt = require('bcrypt')

exports.authenticateUser = async (req, res, next) => {
    const authorization = req.headers.authorization
    try {
        if(!authorization) {
            return res.status(403).send({
                message:"Forbidden"
            })
        }
        const encoded = authorization.substring(6);
        const decoded =  Buffer.from(encoded, 'base64').toString('ascii')
        const [username, password] = decoded.split(':')
        const authUser = await User.findOne({username});
        if(!authUser) {
            return res.status(403).send({
                message: 'Forbidden'
            })
        }
        if(authUser){
             const match = await bcrypt.compare(password,  authUser.password)
       if(!match) {
        return res.status(403).send({message: 'Forbidden'})
       }
       if(match) {
        req.authUser =  {
            username:authUser.username,
            role: authUser.user_type
       }
       }
      
    }
    next()
    } catch (error) {
        next()
        res.json({
            message: error
        })

        next()
        
    }
}
