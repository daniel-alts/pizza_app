const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
 id : ObjectId,
 username: {
    type: String, 
    lowercase: true,
    unique: true, 
    required: [true, "can't be blank"]
},
 email: {
    type: String, 
    lowercase: true,
    unique: true, 
    required: [true, "can't be blank"]
},
 password: {
    type: String, 
    required: true,
    min: [6, 'Password must be longer than 6'],
    required: [true, "can't be blank"]
},
 user_type: {
        type: String,
        default: "user",
        required: true,
        enum: [
            "admin",
            "user"
        ]
    }
});

module.exports = mongoose.model('User', UserSchema);

