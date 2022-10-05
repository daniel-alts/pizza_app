const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    id: ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3 },
    user_type: { type: String, default: "user", enum: ["admin", "user"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
