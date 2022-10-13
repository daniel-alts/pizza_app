const jwt = require('jsonwebtoken');


const userauth = async (req, res, next) => {
    try{

            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.json({ message: "Not authorized"});
            }else{
                 const decoded = jwt.verify(token, process.env.SECRET);
                 req.user = decoded;
                 next();
                res.json({ error: true, message: "Internal server error"});
  
            }
    
    }catch(error){
        throw new Error
    }

}


const adminauth = (req, res, next) => {

    next()
}


module.exports = {
    userauth,
    adminauth
}

