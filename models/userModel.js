const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: ObjectId,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  user_type: { type: String, required: true, enum: [ "user", "admin"] }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
