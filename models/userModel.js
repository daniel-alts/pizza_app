const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],

})

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.id
        delete returnedObject.__v
        delete returnedObject.password
    }
})


const User = mongoose.model('User', UserSchema)

module.exports = User;