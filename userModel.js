const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    user_type: { type: String, enum: ["admin", "user"], default: "user" }
})


UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
