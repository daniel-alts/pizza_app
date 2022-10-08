const jwt = require('jsonwebtoken');


const userauth = async (req, res, next) => {
    try{

        next()
    }catch(error){

    }

}


const adminauth = (req, res, next) => {

    next()
}


module.exports = {
    userauth,
    adminauth
}

