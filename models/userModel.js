const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

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
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    user_type: {
        type: String,
        required: true,
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

UserSchema.pre(
    'save', 
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10)
        
        this.password = hash;
        next()
})

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;    
    const compare = await bcrypt.compare(password, this.password)

    return compare;
}




const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel;