const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // select: false,
    required: true
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'],
  },
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
}

UserSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return token;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
