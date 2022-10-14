const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
  {
    id: ObjectId,
    username: {
      type: String,
      unique: true, //Set username to be unique between users
      required: [true, "Username cannot be blank"], //Username is set to be required and cannot be blank
      maxLength: 15,
    },
    password: {
      type: String,
      required: [true, "Password cannot be blank"], //Password is set to be required and cannot be blank
      maxLength: 10,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true, //Set email to be unique between users
      required: [true, "Email cannot be blank"], //Email is set to be required and cannot be blank
      match: [/\S+@\S+\.\S+/, "You entered an invalid email address"], //Regular email address expression that checks if email address is valid
    },
    phone_number: { type: Number },
    user_type: { type: String, default: "user" },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." }); //uniqueValidator plugin and returns friendly message if email or username is taken

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
