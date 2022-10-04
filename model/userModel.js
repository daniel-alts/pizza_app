// 21:39 thu sep22 wk38 2022

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
  
  age: Number,
  
  email: { type: String, required: true, lowercase: true },

  firstName: '',

  lastName: '',

  deliveryAddress: { street: String, city: String },
});
