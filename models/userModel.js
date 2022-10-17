const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
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

// userSchema.pre(
//     'save',
//     async (next) => {
//         const user = this
//         const hash = await bcrypt.hash(this.password, 10)

//         this.password = hash
//         next()
//     }
// )

userSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

userSchema.methods.isValidPassword = async (password) => {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}

const User = mongoose.model('user', userSchema)

module.exports = User