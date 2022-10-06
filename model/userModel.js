const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
  },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  //validator
  if (!email || !password) {
    throw Error("All fields must be complete");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("password is not valid");
  // }
  if (!password.length >= 6) {
    throw Error("password is must be greater than 6 ");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//  static login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be complete");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
