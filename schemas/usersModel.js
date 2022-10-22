const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function(next) {
    const user = this
    user.password = await bcrypt.hash(user.password, 10)
    
    next()
})


const Users = mongoose.model('Users', userSchema);
module.exports = Users;
