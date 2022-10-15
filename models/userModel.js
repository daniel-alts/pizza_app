const mongoose = require('mongoose');
const bcrypt = require("bcrypt");



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user_type: { type: String, default: "user", enum: [ 'admin', 'user'] },
});


userSchema.pre('save', async function(){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (clientPassword) {
    const isMatch = await bcrypt.compare(clientPassword, this.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema);

module.exports = User;