const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    created_at: Date,
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    user_type: {
        type: String,
        enum: ['admin', 'user']
    }
});

const User = mongoose.model('User', UserSchema)

module.exports = User