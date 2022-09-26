const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const USER_TYPE = {
//     ADMIN: 'admin',
//     USER: 'user'
// }

const UserSchema = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    user_type: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const userModel = mongoose.model('User', UserSchema);

module.exports = { userModel };
