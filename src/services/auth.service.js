const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await userService.findUser(username);
        if (!user) {
          return res.status(401).send("Invalid Username/Password");
        } else {
          const result = await user.comparePassword(password);
  
          if (result) {
            const token = await user.generateToken();
            res
              .header("x-auth-token", token)
              .status(200)
              .json({ user: user, token: token });
          } else {
            return res.status(401).send("Invalid LP number/Password");
          }
        }
      } catch (error) {
        console.log(error)
        res.status(400).json({message: "Internal server error"});
    }
}

const register = async (req, res) => {
    try{
    const newUser = req.body;
    const user = await userService.createUser(newUser);
    res.json({success: true, message : `User successfully registered`});

    }catch(error){
        res.json({error: true, message : `Internal server error`});
    }
    
}

const userauth = async (req, res, next) => {
    try{

            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.json({ success:false, message: "Not authorized"});
            }else{
                 const decoded = jwt.verify(token, process.env.SECRET);
                 req.user = decoded;
                 next();
            }
    
    }catch(error){
        res.json({ error: true, message: "Internal server error"});
    }

}


const adminauth = (req, res, next) => {
    if(req.user === 'admin'){
        next()
    }else{
        res.json({success: false, message: "Unauthorized"})
    }
}


module.exports = {
    userauth,
    adminauth,
    login,
    register
}

