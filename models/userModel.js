const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserModel = new Schema({
  id: ObjectId,
  created_at: Date,
  username: { type: String, required: true },
  password: { type: String, required: true },
  user_type:  { 
    type: String, 
    required: true, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
});

const User = mongoose.model('Users', UserModel);

module.exports = User;
