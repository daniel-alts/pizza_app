const User = require('../modals/userModal')
const bcrypt = require('bcrypt')




const   header = async (req,res, next) =>{
    const authorization = req.headers.authorization
    try{
        if(!authorization) return res.status(403).send({message:'Forbidden'})
        if(authorization){
            // remove "Basic"
            const encoded  = authorization.substring(6)
            //decode to get username and password as  plain text
            const decoded = Buffer.from(encoded,'base64').toString('ascii')
            const [username,password] = decoded.split(":")
            //get the user object from database
            const authenticatedUser = await User.findOne({username})
            //compare the password 
            const match = await bcrypt.compare(password, authenticatedUser.password)
            if (!match) return res.status(403).send({message:'Forbidden'})

            if (match){
                req.authenticatedUser = {
                username:authenticatedUser.username,
                role:authenticatedUser.user_type,
            }
        }
        }
        next()
    }catch(err){
        console.log(err)
        return res.status(500).send({message:'Error occurred'})
    }
}








module.exports = header