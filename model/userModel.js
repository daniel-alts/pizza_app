const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  user_type: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
