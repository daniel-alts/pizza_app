
		const mongoose = require('mongoose');
		const bcrypt = require('bcrypt');
		const Schema = mongoose.Schema;
		const ObjectId = Schema.ObjectId;
		
		const UserModel = new Schema({
		  id: ObjectId,
		  created_at: Date,
		  username: { type: String, required: true },
		  password: { type: String, required: true },
		  email: { type: String, required: true },
		  user_type:  { 
			type: String, 
			required: true, 
			enum: ['user', 'admin'], 
			default: 'user' 
		  }
		});
		
		
	
	
	 UserModel.pre(
		'save',
		async function (next) {
			const user = this;
			const hash = await bcrypt.hash(this.password, 10);
	
			this.password = hash;
			next();
		}
	);
	
	UserModel.methods.isValidPassword = async function(password) {
		const user = this;
		const compare = await bcrypt.compare(password, user.password);
	  
		return compare;
	  }

	const User = mongoose.model('Users', UserModel);
		
	module.exports = User;	


