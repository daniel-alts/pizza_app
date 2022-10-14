const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  UserName: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  User_Type: { type: String, enum: ["Admin", "User"] },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.Password, 10);

  this.Password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.Password);
  return compare;
};

module.exports = mongoose.model("USERS", UserSchema);
