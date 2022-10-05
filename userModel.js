const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  created_at: Date,
  username:{type:String,required:true, uniqe:true},
  password:{type:String,required:true},
  user_type: { type: String, enum:['admin','user'] ,required:true},
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
