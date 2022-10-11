// 21:39 thu sep22 wk38 2022

const { Schema, model } = require('mongoose');

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Hey, username is required'],
    unique: true,
    lowercase: true,
    maxlength: 15,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required, of course!'],
    minlength: 8,
    maxlength: 100,
  },
  userType: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },

  age: Number,

  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },

  firstName: {
    type: String,
    required: [true, 'First name is required'],
    lowercase: true,
    maxlength: 30,
    trim: true,
  },

  lastName: {
    type: String,
    lowercase: true,
    maxlength: 30,
    trim: true,
  },

  deliveryAddress: { street: String, city: String },

  date: {
    type: Date,
    default: Date.now,
  },
});

const User = model('User', userSchema);

module.exports = { User };
