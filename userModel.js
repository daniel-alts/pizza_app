const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: [7, "Password must be more than 6 digits"]
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
