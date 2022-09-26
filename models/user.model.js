const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'],
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
