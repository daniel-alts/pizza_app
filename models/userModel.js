const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: {
            unique: true
        }

    },
    password: {
        type: String,
        required: true
    },
    user_type: { type: String, enum: ['admin', 'user'] }

}, {

    timestamps: true,

});

const User = mongoose.model('User', UserSchema);

module.exports = User;