const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  created_at: Date,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
