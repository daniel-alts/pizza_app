const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  username: {
    type: String,
    default: "",
    required: true
  },
  password: {
    type: String,
    default: "",
    required:true
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const Users = mongoose.model("User", OrderSchema);

module.exports = Users;
