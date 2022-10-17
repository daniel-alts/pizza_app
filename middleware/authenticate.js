
const userModel = require('../models/userModel')

async function authenticateUser (req,res,next){
    // get user authorization/login details
    const userDeets = req.headers.authorization
    // if user does not login
    if (!userDeets){
        res.status(403).json({ message: 'Forbidden!' })
    }
    // get only login details from authorization header
    const userDeetsEncoded = userDeets.substring(6)
    
    // decode or convert to readable ascii
    const userDeetsDecoded = Buffer.from(userDeetsEncoded, 'base64').toString('ascii')
    
    // destructure to get username and password
    const [username, password] = userDeetsDecoded.split(':')
    
    // query our db to check for user details
    const authenticatedUser = await userModel.findOne({username})
    
    // if user is not found in db
    if (!authenticatedUser){
        res.status(403).json({ message: 'Forbidden!' })
    }

    // check for correct password
    if(authenticatedUser.password === password){
        next()
    }else{
        res.status(403).json({ message: 'incorrect user details!' })
    }
}



module.exports = { authenticateUser }

