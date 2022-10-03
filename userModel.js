const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  username: {
    type: String,
    required: [true, "A username must be provided"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A password must be provided"],
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'],
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
