const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {type: String, default: null},
  password: {
    type:String,
    required: [true, "password can't be empty"]
  },
  user_type:   {
    type:String,
    enum: ['admin', 'user'],
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("User", UserSchema)