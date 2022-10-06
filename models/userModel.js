const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
        default: 'user',
        enum: ['user', 'admin']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;