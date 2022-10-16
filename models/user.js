const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    id: ObjectId,
    created_at: Date,
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    user_type: {
        type: String,
        enum: ['admin', 'user']
    }
})


UserSchema.pre(
    'save',
    async (next) => {
        const user = this
        const hash = await bcrypt.hash(this.password, 10)

        this.password = hash
        next()
    }
)

UserSchema.methods.isValidPassword = async (password) => {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel