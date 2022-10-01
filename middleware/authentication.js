const User = require('../model/userModel')

const authenticate = async (req,res,next)=>{
    const auth = req.headers.authorization

    if(!auth){    
        return res.status(401).json({status:false, msg: 'Please provide your username and password in the Basic authorization header or go to /register to create an account'})
    }

    const [username,password] = new Buffer.from(auth.split(' ')[1],'base64').toString().split(':')
    if(!username || !password){
       return  res.status(401).json({ status: false, error:"Please fill in Your username and password"} )
    }

    try {
        const user = await User.findOne({username:username}) 
        if(!user){
            return res.status(404).json({status: false, msg: "you are not registered yet go to /register and create an account"})
        }
        if(user.password !== password){
            return res.status(401).json({status: false, msg: "your Password is incorrect"})
        }
    } catch (error) {
       return res.status(500).json({status: false, msg:"internal server error"})
    }
    next()
   

}

module.exports = authenticate