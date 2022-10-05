const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username.'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password Not the same.'
        },
    },
    user_Type:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) 
    return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next()
})


userSchema.methods.comparePasswords = async function(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User