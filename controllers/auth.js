require('dotenv').config()
const User = require('../models/User')

const token = process.env.TOKEN

const login = async (req, res) => {
    const {username, password} = req.body
    try {
        if(!username || !password) throw ('Please enter a valid username/password')
        const user = await User.findOne({username});
        if(!user) throw `No user with username ${username}`
        const isPasswordCorrect = user.comparePasswords(password)
        if (!isPasswordCorrect) throw ('Incorrect password')
        res.json({user, token: token})
        
    } catch (error) {
        res.json({error})
    }
    
}

 
const register = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    if(!password){
        res.status(400).json({msg: 'Invalid password'})
    }
    if(!username){
        res.status(400).json({msg: 'Invalid username'})
    }

    try {
        const user = await User.create({ ...req.body })
        console.log(user)
        res.status(201).json({msg: 'Successfully registered', user, token: token})
    } catch (error) {
        res.status(500).json({error})
    }
}



module.exports = {login, register }