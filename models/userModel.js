const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    user_type: { 
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user'
    }
});

module.exports = mongoose.model('User', UserSchema);