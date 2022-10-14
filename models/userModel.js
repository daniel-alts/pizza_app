const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
	id: ObjectId,
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	passWord: { type: String, required: true },
	userType: {
		type: String,
		default: "user",
		enum: ["admin", "user"],
	},
});

// Hash the plain text password before saving
// UserSchema.pre("save", async function (next) {
// 	const user = this;
// 	if (user.isDirectModified("password")) {
// 		user.password = await bcrypt.hash(
// 			user.passWord,
// 			8
// 		);
// 	}
// 	next();
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;
