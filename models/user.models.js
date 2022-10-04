const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
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
    default: "user",
    enum: ["admin", "user"],
  },
  fullname: String,
  city: String,
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
