const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: [true, "Please, fill"]},
  email: { type: String, unique: true , required: [true, "Please, fill"]},
  password: { type: String ,  min: [6, 'Password must be longer than 6'], required: [true, "Please, fill"]},
  user_type: { type: String, default: "user", required: true,
        enum: [
            "admin",
            "user"
        ]
    }
});

module.exports = mongoose.model("User", UserSchema);