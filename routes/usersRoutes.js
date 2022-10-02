const express = require('express')
const usersRouter = express.Router()
const usersModel = require('../schemas/usersModel')


usersRouter.get('/', async (req, res) => {
    const allUsers = await usersModel.find()
        .then((allusers) => {
            console.log(allusers);
            res.json({status: true, allusers})
        }).catch((err) => {
            res.status(404).end(err)
        })
})

usersRouter.post('/', async (req, res) => {
    const user = req.body

    console.log(user);

    const allUsers = await usersModel.create(user)

    res.json({status: true, allUsers})
})


module.exports = usersRouter