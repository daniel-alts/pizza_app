const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  firstname: {
    type: String,
    default: ""
  },
  lastname: {
    type: String,
    default: ""
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(passportLocalMongoose)

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
