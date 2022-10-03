const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    user_type: {
        type: String,
        enum: ['user', 'admin'],
    }
})

const User = new mongoose.model('User', userSchema)

module.exports = User