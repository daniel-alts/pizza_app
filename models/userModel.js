const moogoose = require('mongoose');

const Schema = moogoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    user_type: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }    
});

// Export the model
module.exports = moogoose.model('users', UserSchema); 