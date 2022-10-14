const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    trim: true,
    unique: [true, 'Username must be unique'],
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Username is required'],
  },

  user_type: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  created_at: Date,
  updated_at: Date,
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
