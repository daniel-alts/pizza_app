const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
	id: ObjectId,
	created_at: Date,
	username: {
		type: String,
		required,
	},
	password: {
		type: String,
		required,
	},

	user_type: {
		type: String,
		enum: ["admin", "user"],
		required,
	},
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
