const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,

  name: {
    type: String,
    required: [true, "Please enter a name"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);