const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
  id: ObjectId,
  email: String,
  password: String,
  user_type: { type: String, enum: ["user", "admin"], default: "user" },
});

UserSchema.pre(
  "save",
  async function (next) {
    const user = this
    console.log(this.password)
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  }
)

UserSchema.methods.verifyPassword = async function(password) {
  const user = this
  console.log(password, user.password, "adhadjd")
  const compare = await bcrypt.compare(password, user.password)
  // const compare = await bcrypt.compare(password, "$2b$10$NO4AXQwMkq1DcOd1IRjhWeECbVE/Pmn1o8FEDTViJuy5F6TEPwux6")
  console.log(compare)
  return compare
}

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
