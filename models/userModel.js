require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new Schema({
	user_id: Schema.Types.ObjectId,
	username: {
		type: String,
		trim: true,
		unique: [true, "Username must be unique"],
		required: [true, "Username is required"],
	},
	password: {
		type: String,
		required: [true, "Username is required"],
	},

	user_type: {
		type: String,
		enum: ["admin", "user"],
		required: [true, "user_type is required"],
	},
	created_at: Date,
	updated_at: Date,
});

UserSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, user.password);
};

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
