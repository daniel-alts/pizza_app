const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'The username is a required field'],
    unique: [true, 'This username already exist']
  },
  email: {
    type: String,
    required: [true, 'Your email is required'],
    unique: [true, 'This email already exist']
  },
  user_type: String,
  password: {
    type: String,
    required: [true, 'The Password is required'],
    unique: true
  },
  phone_number: Number
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
