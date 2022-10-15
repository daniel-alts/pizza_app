const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


//new schema
    const UserSchema = new Schema({
        title: {
            type: String,
            required: true
        },   
		username: {
			type: String,
			required: [true, 'User must provide a username'],
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		
		password: {
			type: String,
			required: true,
		},
		
		userType: {
			type: String,
			default: 'user',
            enum: ('admin', 'user'),
			required: true,
		},
    
	}, { timestamps: true })


	UserSchema.pre(
		'save',
		async function (next) {
			const user = this;
			const hash = await bcrypt.hash(this.password, 10);
	
			this.password = hash;
			next();
		}
	);
	
	UserSchema.methods.isValidPassword = async function(password) {
		const user = this;
		const compare = await bcrypt.compare(password, user.password);
	  
		return compare;
	  }
	
	

	const UserModel = mongoose.model('user', UserSchema);
	
	module.exports = UserModel;




