const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minLength: [8, 'Password too short'],
		},
		user_type: {
			type: String,
			required: [true, 'User type is required'],
			enum: ['admin', 'user'],
		},
		first_name: {
			type: String,
			required: [true, 'First name is required'],
			minLength: 2,
		},
	},
	{
		timestamps: {},
	}
);

module.exports = mongoose.model('user', userSchema);
