const User = require('../model/userModel')

const authenticate = async (req,res,next)=>{
    const {user} = req.body

    if(!user){
        return res.status(401).json({status:false, msg: 'Please provide your user Details'})}

    const {username,password} = user
    if(!username || !password){
       return  res.status(401).json({ status: false, error:"Please fill in Your username and password"} )
    }

    let findUser ={}
    findUser.username = username
    findUser.password = password

    try {
        const user = await User.findOne({username:username}) 
        if(!user){
            return res.status(404).json({status: false, msg: "you are not registered yet go to /register and create an account"})
        }
        const confirmEmailAndPassword = await User.findOne(findUser)
        if(!confirmEmailAndPassword){
            return res.status(401).json({status: false, msg: "your Password is incorrect"})
        }
    } catch (error) {
       return res.status(500).json({status: false, msg:"internal server error"})
    }
    next()
   

}

module.exports = authenticate