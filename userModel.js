const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  user_type: {
    type: String,
    required: true,
    enum: ["admin", "user"]
  }
});

// Hash the password before a user is saved to the database
UserSchema.pre(
  "save",
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
)

// checks if the password entered matches the hashed password in the database
UserSchema.methods.validPassword = async function(password) {
  const user = this;
  const result = await bcrypt.compare(password, user.password);
  return result;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
