const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    //required: [true, 'The username is a required field'],
    unique: [true, 'This username already exist']
  },
  email: {
    type: String,
    required: [true, 'Your email is required'],
    unique: [true, 'This email already exist']
  },
  user_type: String,
  password: {
    type: String,
    required: [true, 'The Password is required'],
    unique: true
  },
  phone_number: Number
  
});

UserSchema.pre('save', async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 12);

      this.password = hash;
      next();
  }
);

UserSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
