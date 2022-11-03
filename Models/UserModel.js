const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const UserSchema = new Schema({
    username: {
    type: String,
    required: true, 
    min: 5,
    unique: true 
},
password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
},
userType: {
 type: String, 
 enum: ['admin', 'user']},

});

UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
)

UserSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
}


module.exports = mongoose.model("USER", UserSchema);