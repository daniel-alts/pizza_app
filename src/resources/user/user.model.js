const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	user_type: {
		type: String,
		default: 'user',
		enum: ['admin', 'user'],
	},
})


// Encrypt password before saving it to database
UserSchema.pre('save', function (next) {
	let user = this

	//hash the password only if it's a new password
	if (!user.isModified('password'))
		return next()

	//generate salt
	bcrypt.genSalt(
		SALT_WORK_FACTOR,
		(err, salt) => {
			if (err) return next(err)

			//hash the password using our new salt
			bcrypt.hash(
				user.password,
				salt,
				(err, hash) => {
					if (err) return next(err)

					//override the clear text password with the hashed one
					user.password = hash
					next()
				},
			)
		},
	)
})


// Compare user inputted password with password in the database
UserSchema.methods.comparePassword =
	function (password) {
		const passwordHash = this.password
		return new Promise(
			(resolve, reject) => {
				bcrypt.compare(
					password,
					passwordHash,
					(err, same) => {
						if (err) {
							return reject(err)
						}
						resolve(same)
					},
				)
			},
		)
	}


module.exports = mongoose.model('user', UserSchema)
