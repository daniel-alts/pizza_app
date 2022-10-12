const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: 'user' },
  createdAt: { type: Date, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
