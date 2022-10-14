const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

// CREATING USER SCHEMA
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "provide a username!"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});


// A DOCUMENT MIDDLEWARE TO ENCRYPT USER PASSWORD BEFORE SAVING TO DB
userSchema.pre('save', async function(next){
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


// A METHOD TO COMPARE USER PASSWORD
userSchema.methods.comparePassword = async(candidatePassword, userPassword) =>{
  return await bcrypt.compare(candidatePassword, userPassword)
}

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


// CREATING USER MODEL
const User = mongoose.model("User", userSchema);
module.exports = User;
