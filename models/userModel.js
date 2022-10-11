const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: "String",
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
  user_type: {
    type: "String",
    enum: ["admin", "user"],
    default: "user",
  },
  email: {
    type: String,
  },
});

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

const User = mongoose.model("user", UserSchema);

module.exports = User;
