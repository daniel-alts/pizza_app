// 21:39 thu sep22 wk38 2022

const { Schema, model } = require('mongoose');
const { genSalt, hash } = require('bcrypt');

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    maxlength: [15, 'Hey, your username must be 15 characters or less'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required, of course! :)'],
    minlength: [8, "Heads up, your password can't be less than 8 characters"],
    maxlength: [
      100,
      "Wow! Your password is impressive! Alas, we can't afford more than 100 characters for password",
    ],
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
    maxlength: [
      30,
      "Sorry, we can't afford more than 30 characters for your first name",
    ],
    trim: true,
  },

  lastName: {
    type: String,
    lowercase: true,
    maxlength: [
      30,
      "Sorry, we can't afford more than 30 characters for your last name",
    ],
    trim: true,
  },

  deliveryAddress: { street: String, city: String },

  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  const salt = await genSalt(); // generate a random salt
  this.password = await hash(this.password, salt); // concantenate and hash the password and salt
  next();
});

const User = model('User', userSchema);

module.exports = { User };
