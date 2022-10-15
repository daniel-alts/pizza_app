const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String  
    },
    user_type: {
        type: String
    }

});

userSchema.pre(
    'save',
    async function (next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

userSchema.methods.isValidPassword = async function (password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

const userModel = model("users", userSchema);

module.exports = userModel;