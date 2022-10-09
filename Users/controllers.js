const userModel = require('./model')
const jwt = require('jsonwebtoken')

const registerUser = async(req, res) =>{
    const { username, password, user_type } = req.body

    await userModel.create({ username, password, user_type})

    res.status(201).json({ msg: 'successfully registered'})
    
}

const login = async(req, res) =>{
    const { username, password } = req.body
    if(!username || !password ) {
        return res.status(400).json({ msg: 'username and password is required'})
    }
    const user = await userModel.findOne({ username })
    if(!user){
        return res.status(200).json({ msg: 'sorry this user does not exist' })
    }
    const validate = await user.comparePassword(password)
    if(!validate) {
        return res.status(400).json({ msg: 'invalid credentials' })
    }

    const body = { _id: user._id, username: user.username }
    const token = jwt.sign({ user:body }, process.env.JWT_SECRET)

    return res.status(200).json({ token })
}

module.exports = {
    registerUser,
    login
}