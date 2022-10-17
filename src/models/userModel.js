const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,

    enum: ['admin', 'user'],
  },

  website: {
    type: String,
    trim: true,
  },
});
userSchema.pre('save', async function(next) {
  let user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
