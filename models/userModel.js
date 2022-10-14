const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    lowercase: true,
    minLength: 2,
    trim: true,
    required: [true, "Why won't you have a username?"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    trim: true,
    required: [true, "You need a password! It's a dangerous world online"],
  },
  user_type: {
    type: String,
    lowercase: true,
    enum: {
      values: ["admin", "user"],
      message: "You have to be either an admin or user.",
    },
    required: [true, "You need a role!"],
  },
  created_at: {
    type: Date,
    default: moment().format(),
  },
});

// Document pre save middleware/hook
userSchema.pre("save", async function (next) {
  console.log(this.password);
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// method that will be available on all user document
userSchema.methods.verifyPassword = async function (password) {
  console.log(password, this.password);
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
