const mongoose = require("mongoose")
const moment = require("moment")
const passportLocalMongoose = require('passport-local-mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const dateNow = moment().toDate()

const UserSchema = new Schema({
    id: ObjectId,
    createdAt: {type: Date, default: dateNow},
    username: {type: String, required: true},
    password: {type: String, required: true},
    user_type: {type: String, enum: ["admin", "user"]},
    email: {type: String, required: true, unique: [true, "User already exists"]}

})

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("userPassport", UserSchema);

module.exports = User