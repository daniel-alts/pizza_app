const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    minLength: 2,
    trim: true,
    required: [true, "You need a username!"],
    unique: true,
  },
  password: {
    type: String,
    lowercase: true,
    minLength: 5,
    trim: true,
    required: [true, "You need a password!"],
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "Which type of user are you?"],
  },
  created_at: {
    type: Date,
    default: moment().format(),
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
