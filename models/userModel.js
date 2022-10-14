const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
  id: ObjectId,
  username: String,
  password: String,
  user_type: { type: String, enum: ["user", "admin"], default: "user" },
});

UserSchema.pre(
  "save",
  async function (next) {
    const user = this
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  }
)

UserSchema.methods.verifyPassword = async function(password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
