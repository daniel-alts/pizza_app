const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema ({
    id: ObjectId,
    userName: {
        type: String, 
        minLength: 7,
        maxLength: 20,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        minLength: 11,
        maxLength: 11,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
        unique: true
    },
    houseNumber: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        minLength: 8,
        maxLength: 100,
        required: true,
        unique: true
    },
    user_type: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
        required: true
    }
    // holds jwt web token
}, {timestamps: true});

// {timestamps: true} option creates a createdAt and updatedAt field on our models
// that contain timestamps which will get automatically updated when our model changes. 
UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema);
module.exports = User;


