const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    UserName: {
        type: String,
        required: true,
        min:4,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    User_Type:{ type: String, enum: ['Admin', 'User'] },
})


module.exports = mongoose.model('USERS', UserSchema);