const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { type: String, default: 'user', enum: ['admin', 'user'] }
});

const Order = mongoose.model('User', userSchema);

module.exports = Order;