const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  user_type: {
    type: String,
    required: true,
    enum: ["admin", "user"]
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
