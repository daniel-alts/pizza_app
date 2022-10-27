const { UserModel } = require('../models')
const moment = require('moment');



async function createUser (req, res){
    const body = req.body;

    const user = await UserModel.create({ 
        created_at: moment().toDate(),
        username: body.username,
        password: body.password,
        lastname : body.lastname,
        firstname: body.firstname
        
    })

    .then((user)=>{
            res.status(200).json({
                message: "User successfully uploaded!",
                data: user
            })
    }).catch((err)=>{
        console.log(err)
            res.status(500).json({
                message: "Uploading failed!",
                data: err
            })
    })
 
}


async function getUser (req, res){
    const userId = req.params.id

    const user = await UserModel.findById(userId)

    .then((user)=>{

            res.status(200).send({
                message: "User found!",
                data: user
            })
    }).catch((err)=>{
        console.log(err)
            res.status(500).send({
                message: "failed!",
                data: err
            })
    })
}

async function getUsers (req, res) {

    const users = await UserModel.find()
    .then((users)=>{
        res.status(200).send(users)
    }).catch((err)=>{
        console.log(error)
        res.status(500).send("An error occured!")
    })
   
}


async function updateUser (req, res) {
    const id= req.params.id; 
    const body = req.body
    

    const user = await UserModel.findByIdAndUpdate(id, {
        "username" : body.username,
        "password" : body.password,
       "firstname" : body.firstname,
      "lastname" :   body.lastname 

    }, {new: true})
    .then((user)=>{
        res.status(200).json({
            message: "User successfully updated",
            data: user})

        }).catch((err)=>{
        console.log(err)
        res.status(500).send("An error occured while updating your user")
    })
   
}


async function deleteUser (req, res){
    const id  = req.params.id;
    await UserModel.findByIdAndDelete(id)
    
    .then(()=>{
        res.status(200).send("User successfully deleted!")
    }).catch ((error)=> {
        console.log(error)
        res.status(500).send("An error occured while fecthing your order")})

}




module.exports = { createUser,
                    getUser,
                    getUsers,
                    updateUser,
                    deleteUser

}