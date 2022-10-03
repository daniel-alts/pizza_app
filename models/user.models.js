const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  updated_at: Date,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  user_type: String,
});

const user = mongoose.model("user", UserSchema);

module.exports = UserSchema;