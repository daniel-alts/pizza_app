const express = require('express');
const userRoute = express.Router()
const moment = require('moment');
const mongoose = require('mongoose');
const userModel = require('../model/user');
const userController = require('../Controllers/userController')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
// const User = require('../model/user');

// Update
userRoute.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, PASSWORD_SECRET_KEY).toString();
    }
    try{
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Delete
userRoute.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted!')
    } catch(err) {
        res.status(500).json(err)
    }
})

// Get User by ID
userRoute.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const user = await userModel.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Get All Users
userRoute.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try{
        const users = query
        ? await userModel.find().sort({ _id: -1 }).limit(5)
        : await userModel.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Get Users Stats
userRoute.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await userModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1},
                },
            }
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// userRoute.get('/usertest', (req, res)=>{
//     res.send("User test is successful")
//     console.log("User test is successful")
// })

// userRoute.post('/posttest', (req, res)=>{
//     const test = req.body.username
//     console.log(test)
//     res.send(test)
// })

// userRoute.post('/signup', userController.signup)
// userRoute.post('/login', userController.login)

// userRoute.get("/", async (req, res)=>{
//     //return all books
//    await userModel.find({})
//         .then((users)=>{
//             res.status(200).send(users)
//         })
//         .catch((err)=>{
//             console.log(err)
//             res.status(500).send(err)
//         })
//     // res.send('Books Route!')
// })

// userRoute.post("/", async (req, res)=>{
//     //create all books
//     const pizza = req.body
//     console.log(pizza)

//    await userModel.create(pizza)
//         .then((pizza)=>{
//             res.status(201).send({
//                 message: "Book added successfully!",
//                 data: pizza
//             })
//         }).catch((err)=>{
//             res.status(400).send(err)
//         })

//     // res.send('Book Added!')
// })

module.exports = userRoute