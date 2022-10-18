const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    minLength: 4,
    trim: true,
    required: [true, "You need a username!"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 4,
    trim: true,
    required: [true, "You need a password!"],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
