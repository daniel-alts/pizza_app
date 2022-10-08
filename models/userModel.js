const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // user_type: {
    //   type: String,
    //   default: "user",
    //   enum: ["admin", "user"],
    // },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = mongoose.model("User", UserSchema);
