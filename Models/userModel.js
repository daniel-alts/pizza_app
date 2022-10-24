const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: [true, "Please, fill"]},
  email: { type: String, unique: true , required: [true, "Please, fill"]},
  password: { type: String ,  minlength: [6, 'Password must be longer than 6'], required: [true, "Please, fill"]},
  user_type: { type: String, default: "user", required: true,
        enum: [
            "admin",
            "user"
        ]
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
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 6);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async (
  candidatePassword,
  actualPassword
) => {
  return await bcrypt.compare(candidatePassword, actualPassword);
};

module.exports = mongoose.model("User", UserSchema);