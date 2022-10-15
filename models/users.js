const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now,
  },
});

//pre-hook
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  this.user = user;
  next();
});

//Ensuring the user logs in with the right credentials
UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const comparePassword = await bcrypt.compare(password, user.password);
  
    return comparePassword;
}
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
