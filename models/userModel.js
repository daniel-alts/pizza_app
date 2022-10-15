const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    select: false,
  },
  password: {
    type: String,
    required: [true, "User must confirm password"],
    validate: {
      message: "Passwords do not match",
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  user_type: {
    type: String,
    required: [true, "User must have a type"],
    enum: ["user", "admin"],
    default: "user",
  },
  passwordChangedAt: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async (
  candidatePassword,
  actualPassword
) => {
  return await bcrypt.compare(candidatePassword, actualPassword);
};
// userSchema.methods.changedPasswordAfter = async function (JWTTIMESTAMP) {
//   if (this.passwordChangedAt) {
//     const changedTimeStamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     return changedTimeStamp > JWTTIMESTAMP;
//   }
//   return false;
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
