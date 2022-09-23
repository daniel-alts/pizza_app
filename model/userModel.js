const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    UserName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        required: true,
    },
    User_Type:{ type: String, enum: ['Admin', 'User'], default: 'Admin' },
})


module.exports = mongoose.model('USERS', UserSchema);