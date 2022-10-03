const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        required: true,
        enum: [ "user","admin"],
        default: "user"
    }
})