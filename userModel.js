const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
UserSchema.pre(
  'save',
  async function(next){
    const user= this;
    const hashp = await bcrypt.hash(this.password,10);
    this.password = hashp;
    next();
  }
);

UserSchema.methods.isValidPasswor = async function(password) {
  const user= this;
  const compare = await bcrypt.compare(password,user.password);
  return compare;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
