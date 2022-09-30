const mongoose = require("mongoose");

const userTypes = {
  admin: "admin",
  user: "user",
};

let UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, require: true, trim: true },
    password: { type: String, required: true, trim: true },
    user_type: {
      type: String,
      enum: Object.values(userTypes),
      default: userTypes.admin,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
