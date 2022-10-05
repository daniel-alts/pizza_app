const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
  },
  email: {
    type: String,
    required: true,
  },
  home_address: {
    type: string,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
