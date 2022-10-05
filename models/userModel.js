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
    lowercase: true,
    require: [true, "please input your password"],
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    require: [true, "All user must Have a role"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
