const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

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
        unique: true,
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

userSchema.pre(
    'save',
    async function(next) {
        try {
            const hash = await bcrypt.hash(this.password, 10)
            this.password = hash
            next()
        } catch(err) {
            next(err)
        } 
    }
)

userSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password)
    return compare
}

module.exports = {
    userModel: mongoose.model("User", userSchema),
    userSchema
}