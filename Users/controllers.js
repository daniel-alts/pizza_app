const userModel = require('./model')

const registerUser = async(req, res) =>{
    const { username, password, user_type } = req.body

    await userModel.create({ username, password, user_type})

    res.status(201).json({ msg: 'successfully registered'})
    
}

module.exports = {
    registerUser
}