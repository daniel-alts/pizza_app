const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const UserModel = new Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  user_type:{
    type: String,
    enum:["admin", "user"],
    default: "user",
  }
})

UserModel.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", UserModel)
