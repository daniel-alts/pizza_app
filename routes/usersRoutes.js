const express = require('express')
const usersRouter = express.Router()
const usersModel = require('../schemas/usersModel')
require('dotenv').config()
require('../authentication/authJWT')
const passport = require('passport')

usersRouter.get('/', async (req, res) => {
    const allUsers = await usersModel.find()
        .then((allusers) => {
            console.log(allusers);
            res.json({ status: true, allusers })
        }).catch((err) => {
            res.status(404).end(err)
        })
})

usersRouter.post('/signup', async (req, res) => {
    const user = req.body
    const newUser = await usersModel.create(user)
    res.json({ status: true, newUser })

})


usersRouter.post('/login',
    (req, res, next) => {
        passport.authenticate('login', { session: false }, (error, token, info) => {
            try {
                res.status(200).json({
                    success: true,
                    token
                })
            } catch (error) {
                res.status(401).json({
                    success: false,
                    error: err.message
                })
            }
        })(req, res, next);
    })



module.exports = usersRouter