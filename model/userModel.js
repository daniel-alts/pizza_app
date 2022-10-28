const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const userModelSchema = new Schema({
    id: ObjectId,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    username: { type: String, required: true },
    firstname: { type: String, },
    lastname: { type: String, },
    email: { type: String, },
    password: { type: String, required: true },
    user_type: { type: String, required: true, default: 'user', enum: ['admin', 'user'] }
});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
userModelSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
userModelSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}


const UserModel = mongoose.model('users', userModelSchema);

module.exports = UserModel;
