const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 5,
    maxlength: 16,
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
