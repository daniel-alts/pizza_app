const moogoose = require('mongoose');

const Schema = moogoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,

    email: {
        type: String,
        required: [true, "Please provide your email"]
    },
    
    username: {
        type: String,
        required: [true, "Please provide your username"]
    },

    password: {
        type: String,
        required: [true, "Please enter a password"]
    },

    user_type: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }    
});


module.exports = moogoose.model('users', UserSchema); 