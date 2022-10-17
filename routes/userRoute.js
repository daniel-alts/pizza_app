const express = require('express');
const userModel = require('../models/userModel');
const userRouter = express.Router()

const app = express();
app.use(express.json());

userRouter.get('/', (req, res) => {

userModel.find({})
.then((User) => {
    res.status(200).send(User)
}).catch((err) => {
    res.status(404).send("User not found")
})
})

userRouter.get('/:id', (req, res) => {
const id = req.params.id
userModel.findById(id)
.then(() => {
    res.status(200).send(User)
}).catch((err) => {
    res.status(404).send({
        message:"User not found",
        data: err
    })
})
})

userRouter.post('/',  (req, res) => {
    const newUser = req.body
    userModel.create(newUser)
    .then((newUser) => {
        res.status(201).send({
            message:"User was created successfully",
            data: newUser
        })
    }).catch((err) => {
        res.status(409).send("Unable to create user")
    })
})

userRouter.put('/', (req, res) => {
    const id = req.params.id
    const userUpdate = req.body
    userModel.findByIdAndUpdate(id, userUpdate, {new: true})
    .then(() => {
        res.status(200).send("User was updated successfully")
    }).catch((err) => {
        res.status(409).send("Unable to perform update")
    })
    
})

userRouter.delete('/', (req, res) => {
    const id = req.params.id
    userModel.findByIdAndDelete(id)
    .then(() => {
        res.status(200).send("User deleted successfully")
    }).catch((err) => {
        res.status(409).send("Unable to delete user")
    })

})

module.exports = userRouter