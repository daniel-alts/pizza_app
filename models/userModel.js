const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserId = Schema.ObjectId;

//User details
const UserSchema = new Schema({
    id: UserId,
    created_at: Date,
    usertype: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    firstname: {
      type: String,
      required: false
    },
    lastname: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: false
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
})

// This is a pre-hook that will be called before the user information is saved in the database.
// It will get the plain text password, hash it, and store it.
UserSchema.pre(
  'save',
  async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);

      this.password = hash;
      next();
  }
);

// This makes sure that the user trying to log in has the correct credentials.
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;