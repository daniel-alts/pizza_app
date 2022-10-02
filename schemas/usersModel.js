const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
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
        default: 'user'
    },
    city: {
        type: String
    },
    country: {
        type: String,
        default: 'Nigeria'
    }
})
const Users = mongoose.model('Users', userSchema);
module.exports = Users;
