const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema ({
    id: ObjectId,
    username: {
        type: String, 
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
    },
    user_type: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
        required: true
    }
}, {timestamps: true});

// {timestamps: true} option creates a createdAt and updatedAt field on our models
// that contain timestamps which will get automatically updated when our model changes. 
const User = mongoose.model('User', UserSchema);
UserSchema.plugin(uniqueValidator);
module.exports = User;


