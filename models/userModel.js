const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  username: {
    type: String,
    required: true,
    minLength: [4, "Your username should not be less than 4 characters"],
    maxLength: [15, "Your username should not be more than 15 characters"],
    unique: [true, "This username is already taken"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Your password should not be less than 6 characters"],
    maxLength: [15, "Your password should not be more than 15 characters"],
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
