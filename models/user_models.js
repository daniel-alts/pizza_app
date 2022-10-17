const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

userSchema.pre(
    'save',
    async function(next){
        const user = this
        const hash = await bcrypt.hash(this.password, 10)

        this.password = hash
        next()
    }
)
userSchema.methods.isValidPassword = async function(password){
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}
const User = new mongoose.model('User', userSchema)

module.exports = User