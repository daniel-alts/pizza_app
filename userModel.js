const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserId = Schema.ObjectId;

const UserSchema = new Schema({
  id: UserId,
  username:{ type: String},
password :{ type: String} ,
user_type: { type: String, enum: ['admin','user']},
  created_at:  {
    type: Date,
    default: Date.now,
    required: 'Must have start date - default value is the created date'
},
  age: Number,
 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
