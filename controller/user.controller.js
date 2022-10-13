const userModel = require('../model/userModel')

async function getAllUsers(req,res){
    const users = await userModel.find()
    return res.json({ status: true, users })
}

async function createUser(req,res){
    const body = req.body
    const emailExists = await userModel.find({ email: `${body.email}` });

    if (emailExists != null){
        return res.status(409).json({ status: false, message: "User already exists" })
    }
        
    const user = await userModel.create({ 
        username: body.username,
        password: body.password,
        email: body.email,
        userType: body.userType
    })

    return res.status(201).json({ status: true, user })
}

async function deleteUser(req,res){
    const {id} =  req.params
    const user = await userModel.deleteOne({_id: id})

    return res.json({status: true, user})
}

module.exports={
    getAllUsers,
    createUser,
    deleteUser
}