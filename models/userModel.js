const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: [true, 'Please Provide Your username'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please Provide Your password'],
		minlength: [6, 'Your password should be a minimium of 6'],
	},
	user_type: {
		type: String,
		required: [true, 'Please Provide Your user_type'],
		enum: ['admin', 'user'],
	},
	createdAt: Date,
});

userSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};
module.exports = mongoose.model('User', userSchema);
