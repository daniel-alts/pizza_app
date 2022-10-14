// this is like my auth.js file

const express = require("express")
const moment = require('moment')
const { authenticate } = require("../authentication/authenticate")
const userModel = require("../models/usersModel")

const usersRoute = express.Router()

// get all users
usersRoute.get("/", async(req, res)=>{
    const users = await userModel.find()
    .then((users) =>{
        res.json({ 
            status: true, 
            message: users 
        })
    })
})

// get a user == login/ signin

usersRoute.get('/user', (req, res)=>{
    authenticate(req, res)
    .then((user) =>{
        return user
}).catch(
    (err)=>{
       return err
    }
)
})
    

// create new user == signup
usersRoute.post("/user", (req, res)=>{
    const user = req.body
    const newUser = userModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password
    }).then(
        (newUser)=>{
            res.json({ status: true, message: newUser })
        }
    ).catch(
        (err) =>{
            res.status(404).json({
                status: false,
                message: err
            })
        }
    )
})

// update a user by ID
usersRoute.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { user_type, password } = req.body;
    
    
    // before update can happen, the username and password must be authenticated


    const user = await userModel.findByIdAndUpdate(id)

    if (!user) {
        return res.status(404).json({ status: false, user: null })
    }

    user.user_type = user_type
    user.password = password

    user.save()

    return res.status(200).json({ 
        status: true,
        message: user 
    })
})

usersRoute.delete("/:id", async(req, res)=>{
    const id = req.body

    const user = await userModel.findByIdAndRemove(id)

    if (!user){
        return res.status(404).json({
            status: false,
            message: " User not found"
        })
    }

    return res.status(200).json({
        status: true,
        message: "user deleted",
        user
    })

})



module.exports = usersRoute