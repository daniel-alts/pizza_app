const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    user_type: { type: String, enum: ["admin", "user"], default: "user" }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
