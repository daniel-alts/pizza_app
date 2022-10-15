
const userService = require('../services/user.service');

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




module.exports = {
    login,
    register
}

