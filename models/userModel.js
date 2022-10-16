const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
			default: 'user',
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

userSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.username, 10);
	this.password = hash;
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const valid = await bcrypt.compare(password, this.password);
	return valid;
};

module.exports = mongoose.model('user', userSchema);
