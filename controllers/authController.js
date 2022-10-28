const userModel = require('../models/userModel')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signup = async (req, res) => {
    const user = await userModel.findOne({
        username: req.user.username
    })

    user.firstname = req.body.firstname
    user.lastname = req.body.lastname
    user.email = req.body.email

    await user.save()

    delete user.password

    res.status(201).send({
        message: 'Signup successful',
        user: user
    })

}


const login = (req, res, { err, user, info}) => {
    if (!user) {
        return res.send({ message: 'Username or password is incorect'})
    }
    
    req.login(user, { session: false },
        async (error) => {
            if (error) return res.status(400).send(error)

            const body = {
                _id: user._id,
                username: user.username
            }

            const token = jwt.sign({ user: body}, process.env.JWT_SECRET || 'something_secret')

            return res.status(200).send({ token})
        }
    );
};


module.exports = {
    signup,
    login
}