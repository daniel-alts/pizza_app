const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    created_at: Date,
    name: {type: String, required: "please enter your name"},
    address: {type: String, required: "address is required"},
    email: {type: String, required: "please enter a valid email address", unique: true},
    phone_number: {type: String, required: "please enter a phone number"},
    password: {type: String, required: "password cannot be empty"},
});

UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(user.password, 10);
        this.password = hash;
        this.created_at = moment().toDate(),
        next();
    }
)

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}
const User = mongoose.model('User', UserSchema);

module.exports = User;
