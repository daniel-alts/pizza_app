const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const USER_TYPE = {
//     ADMIN: 'admin',
//     USER: 'user'
// }

const UserSchema = new Schema({
    id: ObjectId,
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
        enum: ["admin", "user"],
        default: "user"
    }
});

UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 12)
        this.password = hash
        next()
    }
)

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password)

    return compare;
}

const userModel = mongoose.model('User', UserSchema);

module.exports = { userModel };
