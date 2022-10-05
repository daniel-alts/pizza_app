const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true,
        

    },
    phonenumber: {
        type: String,
        required: true,
        unique: true

    },

    userType: {
        type: String, enum: ['admin', 'user'], default: "user"
    },
    createdAt: Date,
    updatedAt: Date
});

const user = mongoose.model("user", userSchema);

module.exports = user;