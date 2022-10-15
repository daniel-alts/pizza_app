const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//step1
const userSchema = new Schema({
  id: ObjectId,

  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  usertype: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} is not supported",
    },
    required: ["usertype is required"],
  },
  created_at: Date,
  updated_at: Date,
});

//step 2
userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

//step 3
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

//step 4
const User = mongoose.model("users", userSchema);

//step 5
module.exports = User;
