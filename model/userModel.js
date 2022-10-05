const { Schema, model } = require('mongoose');

const userModel = new Schema(
  {
    username: String,
    fullname: String,
    password: String,
    user_type: {
      type: String,
      enum: ['admin', 'user'],
    },
  },
  { timestamps: true }
);

const User = model('User', userModel);

module.exports = User;
