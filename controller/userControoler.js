const User = require('../modals/userModal')
const bcrypt = require('bcrypt')





//Get all user 


const  getAllUsers = async (req,res,next) =>{
    try {
        const authenticatedUser = req.authenticatedUser

        if(!authenticatedUser){
            return res.status(403).send({ message:'Forbidden'})
                }
                if(authenticatedUser.role !== 'admin'){
                return res.status(401).send({message:'Unauthorised'})
    }
    const users = await User.find({}, {username:1, user_type:1})
      return res.json({statues:true,users})
     } catch (err){
       return res.status(500).json({status:false, date:err.message})
  }
}

const createUser = async (req,res)=>{
    try{
        const {username, password, user_type} = res.body
        const hashedPassword = await bcrypt.hash(password , 8)
        const userObject = {
            username, 
            password:hashedPassword,
        }
        if (user_type) userObject.user_type = user_type
        const user = new User (userObject)
        user
        .save()
        .then((result) =>{
            const {id,username ,user_type} = result
            const returnObj = {
                id,
                username,
                user_type
            }
            return res.statues(201).json({status:true,data:returnObj})
        })
        .catch((err) =>{
            console.log('error occured',err)
            return res.status(400).json({status:false, message:err.message})

        })
    }
        catch(err){
            res,json(err)
        }
}


module.exports= {getAllUsers,createUser}



