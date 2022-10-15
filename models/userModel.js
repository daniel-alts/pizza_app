const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,

  username: {
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

// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
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
