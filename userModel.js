const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserId = Schema.ObjectId; 

const UserSchema = new Schema ({
  id: UserId,

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  user_type: {
    type: String,
    required: true,
    enum: ['admin', 'user']
  },

  created_at: {
    type: Date,
    default: Date.now()
  },

  updated_at: {
    type: Date,
    default: Date.now()
  }
})