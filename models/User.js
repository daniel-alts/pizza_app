const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        required: true,
        type: String, 
        unique: [true, 'Username already exists!']
    },
    password: {
        required: true,
        type: String
    },
    user_type: {
        required: true,
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})




userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePasswords = async function (password){
    password = JSON.stringify(password)
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

userSchema.methods.createJWT = function () {
	return jwt.sign(
        { userId: this._id, name: this.username }, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXP}
    );
};


module.exports = mongoose.model('User', userSchema)