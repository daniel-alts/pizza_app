const express = require("express");
const moment = require("moment");
const userModel = require("../models/userModel");

const userRoute = express.Router()


userRoute.get('/', (req, res) => [
    userModel.find()
        .then(user => {
            res.status(200).send(user)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
            res.status(500).send(err)
        })
])

userRoute.get('/:id', (req, res) => {
    const id = req.params.id
    userModel.findById(id)
        .then(user => {
            res.status(200).send(user)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
})

userRoute.post('/', (req, res) => {
    const user = req.body;
    userModel.create(user)
        .then(user => {
            res.status(201).send(user)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

userRoute.put('/:id', (req, res) => {
    const id = req.params.id
    const user = req.body
    user.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    userModel.findByIdAndUpdate(id, user, { new: true })
        .then(newUser => {
            res.status(200).send(newUser)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

userRoute.delete('/:id', (req, res) => {
    const id = req.params.id
    userModel.findByIdAndRemove(id)
        .then(user => {
            res.status(200).send(user)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

module.exports = userRoute