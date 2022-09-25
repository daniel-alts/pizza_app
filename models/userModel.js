const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    lowercase: true,
    minLength: 2,
    trim: true,
    required: [true, "Why won't you have a username?"],
    unique: true,
  },
  password: {
    type: String,
    lowercase: true,
    minLength: 6,
    trim: true,
    required: [true, "You need a password! It's a dangerous world online"],
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "You need a role!"],
  },
  created_at: {
    type: Date,
    default: moment().format(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
