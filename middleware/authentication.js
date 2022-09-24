const User = require('../model/userModel')

const authenticate = async (req,res,next)=>{
    const {username,password} = req.body
    if(!username || !password){
       return  res.status(401).json({ status: false, error:"Please fill in Your username and password"} )
    }

    let findUser ={}
    findUser.username = username
    findUser.password = password

    try {
        const user = await User.findOne(findUser)
        if(!user){
            return res.status(401).json({status: false, msg: "you are not registered yet go to /register and create an account"})
        }
    } catch (error) {
       return res.status(500).json({status: false, msg:"internal server error"})
    }
    next()
   

}

module.exports = authenticate