const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    created_at: Date,
    username : {type: String},
    password: {type: String},
    user_type: {type: String, enum: ['admin', 'user']}
})

const User = mongoose.model('User', userSchema);
module.exports = User;