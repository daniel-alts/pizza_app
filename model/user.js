const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  user_type: { type: String, enum: ["admin", "user"] },
});

module.exports = mongoose.model("users", userSchema);
