const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      minlength: [3, "Character length must be more than 2"],
    },
    last: {
      type: String,
      minlength: [3, "Character length must be more than 2"],
    },
  },
  username: {
    type: String,
    required: [true, "This field is required"],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "This field is required"],
    minlength: [6, "Character length must be more than 5"],
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} not supported",
    },
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
