const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    _id: Number,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address']
    },
    user_type: {
        type: String,
        required: true,
        enum: ["user", "admin"]
    },
    created_at: {
        type: Date,
        default: Date
    }
})

module.exports = {
    userModel: mongoose.model("User", userSchema),
    userSchema
}