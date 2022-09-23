const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

// CREATING USER SCHEMA
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "provide a username!"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
  },
  user_type: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

// CREATING USER MODEL
const User = mongoose.model("User", userSchema);
module.exports = User;
