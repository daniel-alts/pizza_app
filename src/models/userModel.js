const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
  email: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);
model.exports = User;
