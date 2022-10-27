const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserModel = new Schema({
  id: ObjectId,
  created_at: Date,
  username:  { type: String, required: true },
  password:  { type: String, required: true },
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  user_type: { type: String, enum: ['user', 'admin'], default: 'user', required: true,
  }});



module.exports = mongoose.model('Users', UserModel);


