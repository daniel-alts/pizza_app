const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	id: ObjectId,
	username: { type: String, required: true },
	password: { type: String, required: true },
	user_type: { type: String, enum: ["admin", "user"], default: "user" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;