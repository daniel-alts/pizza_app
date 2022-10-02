const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    username: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    },
    user_type: {
        type: "String",
        enum: ['admin', 'user'],
        default: 'user'
    }, 
    createdAt:{
        type: Date,
        default: Date.now
    }
})
 

const User = mongoose.model('user', UserSchema);

module.exports = User;
