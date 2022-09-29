const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'User must have username'],
			unique: true,
		},
		email: {
			type: String,
			required: false,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please provide your Password'],
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please provide your Password'],
		},
		userType: {
			type: String,
			default: 'Basic',
		},
		profilePicture: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
