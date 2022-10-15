const userModel = require('../models/userModel');

basicAuth= require('basic-auth')

const authenticateUser= async(req, res, next) => {
    const user= await basicAuth(req)
    const authenticatedUsername= await userModel.findOne({username});
    const authenticatedPassword= await userModel.findOne({password});
    
    if (user && user.name === authenticatedUsername && user.pass === authenticatedPassword){
        return res.status(200).send({message: "Success"})
        next()
    }
    
    else {
        return res.status(404).send({message: "Please enter the correct username and password"});
    }

   
}



module.exports = { authenticateUser };