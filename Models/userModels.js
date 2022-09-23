const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		name: String,
		required: [true, 'Every User must have a name'],
	},
	password: {
		password: String,
		required: [true, 'Every User must have a password'],
	},
});
