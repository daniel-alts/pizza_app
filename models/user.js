const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    match: [/^[a-zA-Z0-9]+$/, 'Enter a valid username'], //to prevent user from adding special characters
    required: [true, 'Enter a username']
  },
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