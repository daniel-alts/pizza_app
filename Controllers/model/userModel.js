// ********************IMPORT DEPENDENCY, DEFINE SCHEMA AND CREATE USER MODEL ************/
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    id: ObjectId,
    created_At: Date,
    userName: {type: String, required: true},
    password: {type: String, required: true},
    user_type: ['admin', 'user']
})

module.exports = mongoose.model('User', UserSchema)