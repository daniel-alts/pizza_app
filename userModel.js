const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  phonenumber: Number,
  password: String,
  user_type: { type: String, enum: ['admin', 'user']}

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
