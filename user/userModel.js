const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  users:{type: String, enum: ['user', 'admin']},
  username: string ,unique,
   email:string ,unique,
   password,string,
  
});

const User = mongoose.model('User', UsersSchema);

module.exports = User;
