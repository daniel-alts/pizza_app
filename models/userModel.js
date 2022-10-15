const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  // id: ObjectId,
  username: {
    type: String,
    minLength: 2,
    lowercase: true,
    require: [true, " A user must have a username"],
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    minLength: 4,
    require: true,
    trim: true,
    require: [true, "please input your password"],
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    // require: [true, "All user must Have a role"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// pre save middleware/hook
userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 12);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const user = mongoose.model("user", userSchema);

module.exports = user;
