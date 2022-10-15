const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user
        }
        throw Error('invalid password')
    }
    throw Error('invalid user');
}


const User = mongoose.model('User', userSchema);

//export
module.exports = User;