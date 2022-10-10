const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please tell us your name"],
    unique: [true, "This username is already taken"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Your password should not be less than 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// middleware for encrypting or hashing the password on the userSchema using bcrypt
userSchema.pre("save", async function (next) {
  // we can only hash passwords if passwords are newly created or modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 10 which is the default. it can be higher depending on CPU power
  this.password = await bcrypt.hash(this.password, 10);
  // delete the passwordConfirm field from the database
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
