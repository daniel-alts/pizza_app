const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserModel = new Schema({

    created_at: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enums: ['user', 'admin'],
        default: 'user'
    }
})

const User = mongoose.model('user', UserModel)

module.exports = User