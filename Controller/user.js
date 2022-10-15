const userModel = require('../models/userModel')
const moment = require('moment')

const registerUser = async (req,res)=>{
    const body = req.body
    body.createdAt = moment().toDate()

    try {
        const user = await userModel.create(body)
        res.status(201).json({ message: 'Signup successful', user} )
    } catch (error) {
        if(error.code === 11000){
            return res.status(500).json({ status: false, error:`username ${body.username} is taken already `} )

        }

        let newMessage = Object.values(error.errors).map(element => element.message).join(' , ')
        if(newMessage){      
            return res.status(500).json({ status: false, message: newMessage} )
        }
        return res.status(500).json({ status: false, error} )
    }
}

module.exports = {registerUser}