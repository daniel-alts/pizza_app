const mongoose = require('mongoose');

const mongose =  mongoose.Schema;

const userSchema = new mongose({
 username: {
  type: String,
  required: [true, "User must have a username"],
  unique: true
 },

 password: {
  type: String,
  required: [true, "User must have a password"]
 },

 user_type: {
  type: String,
  required: [true, "User must have a type"],
  enum: ['user', 'admin'],
  default: 'user'
 }
});

const user = mongoose.model('user', userSchema);
module.exports = user;