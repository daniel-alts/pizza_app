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
    required: [true, "Please enter a password"],
    minlength: 8,
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
