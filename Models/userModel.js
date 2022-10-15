const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: String,
    username: {type: String, required: [true, 'Enter your Username']},
    password: {type: String, required: [true, 'Enter your password']},
    user_type: {type: String, require: true, enum: ['admin', 'user']},
    createdAt: Date
})

UserSchema.pre('save', async function(){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
