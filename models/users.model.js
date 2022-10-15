const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: 'user' },
  createdAt: { type: Date, required: true },
});

// Hash password before saving credentials to database
UserSchema.pre(
  'save',
  async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  },
);

// Check if user is logging in with correct password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
